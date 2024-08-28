const pool = require("@root/db/connection");
const generateUUID = require("@root/helpers/generateUUID");
const { exec } = require("child_process");
const { createHmac } = require("node:crypto");

const setupRoutes = (app) => {
  app.get("/", async (req, res) => {
    console.log(process.env.NODE_ENV);
    res.send({
      environment: process.env.NODE_ENV,
    });
  });

  app.get("/messages", async (req, res, next) => {
    try {
      const result = await pool.query(`SELECT * FROM messages`);

      return res.json(result.rows);
    }
    catch(err) {
      console.error(`Error when sending GET to /messages, ${err}`);
    }
  });

  app.post("/messages", async (req, res, next) => {
    if(!req.body.message) return next(new Error("Invalid body, missing message parameter in req.body"));

    try {
      const newMessage = {
        id: generateUUID(),
        message: req.body.message
      };

      const result = await pool.query(`
        INSERT INTO messages(id, message) VALUES($1, $2) RETURNING *
      `, [newMessage.id, newMessage.message]);

      return res.json(result.rows[0]);
    }
    catch(err) {
      console.error(`Error when sending POST to /messages, ${err}`);
    }
  });

  app.post("/deploy-webhook", async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.headers);
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

      if (req.body.ref === 'refs/heads/main') {
	exec("pwd");      
        exec('sh ./scripts/deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send(error);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.send('Deployed Docker images!');
        });
      } else {
          res.send('Not a main branch push event.');
      }
    }
    catch(err) {
      console.error(`Error when sending POST to /deploy-webhook, ${err}`);
    }
  });
};

module.exports = setupRoutes;
