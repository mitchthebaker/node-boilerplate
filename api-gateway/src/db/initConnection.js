const pool = require("./connection");
const migrateTables = require("./migrations/migrateTables");

const initConnection = async () => {
  try {
    await pool.connect();
    await migrateTables();
  }
  catch(err) {
    console.error(`Error during client initialization, ${err}`);
  }
};

module.exports = initConnection;