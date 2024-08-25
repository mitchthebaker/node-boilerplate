const bodyParser = require("body-parser"); 
const cors = require("cors");
const express = require("express");

const accessEnv = require("@root/helpers/accessEnv");
const setupRoutes = require("@root/server/setupRoutes");

const PORT = parseInt(accessEnv("PORT", "3001"), 10); 

const allowedOrigins = ["http:localhost:3000", "http://20.172.67.146:3000"];

const startServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors({
    origin: (origin, cb) => {
      if(allowedOrigins.includes(origin) || !origin) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

  setupRoutes(app);

  app.use((err, req, res, next) => {
    return res.status(500).json({ message: err.message });
  });
  
  app.listen(PORT, () => {
    console.log(`api-gateway listening on ${PORT}`);
  });
};

module.exports = startServer;

