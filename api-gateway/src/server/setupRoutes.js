const pool = require("@root/db/connection");
const generateUUID = require("@root/helpers/generateUUID");

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

      console.log(result.rows[0]);
      return res.json(result.rows[0]);
    }
    catch(err) {
      console.error(`Error when sending POST to /messages, ${err}`);
    }
  });
};

module.exports = setupRoutes;