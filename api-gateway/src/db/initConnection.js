const pool = require("./connection");
const performMigration = require("./migrations/performMigration");

const initConnection = async () => {
  try {
    await pool.connect();
    await performMigration();
  }
  catch(err) {
    console.error(`Error during client initialization, ${err}`);
  }
};

module.exports = initConnection;