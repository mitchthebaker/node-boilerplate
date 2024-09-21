require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { exec } = require("child_process");
const { createHmac } = require("node:crypto"); 

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send({ message: `Webhook server listening on port ${PORT}` });
});

app.post("/deploy-webhook", (req, res) => {
  try {
      console.log(req.body);
      console.log(req.body.action, req.body.workflow_run.conclusion);
      const sig = req.headers["x-hub-signature"];
      const hmac = createHmac("sha1", process.env.GITHUB_SECRET)
	    .update(JSON.stringify(req.body))
	    .digest("hex");
      
      console.log(sig, hmac);

      if (sig !== `sha1=${
        createHmac('sha1', process.env.GITHUB_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex')
      }`) {
        return res.status(403).send('Forbidden');
      }

      if (req.body.workflow_run.name !== "Run the CI/CD Pipeline" && req.body.workflow_run.head_branch !== "main") {
        return res.status(500).send(`Webhook was not triggered from a CI/CD pipeline job in the main branch.`);
      }

      if (req.body.action === "completed" && req.body.workflow_run.conclusion === "success") {      
	return res.status(200).send("Webhook received, deploying to production site..."); 
        exec('sh deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send(error);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`); 
        });
      } else {
          return res.status(500).send(`Webhook action: ${req.body.action}, webhook conclusion: ${req.body.workflow_run.conclusion}`);
      }
    }
    catch(err) {
      console.error(`Error when sending POST to /deploy-webhook, ${err}`);
    }
});

app.use((err, res) => {
  return res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`Webhook server listening on port ${PORT}`));
