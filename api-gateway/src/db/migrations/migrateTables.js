const pool = require("@root/db/connection");

const migrateTables = async () => {
  const messageTable = `CREATE TABLE IF NOT EXISTS
    messages(
      id VARCHAR(36) PRIMARY KEY,
      message VARCHAR(500) NOT NULL
    )
  `;

  try {
    const result = await pool.query(messageTable);
    console.log("Migration successful");
  }
  catch(err) {
    console.error(`Error when creating tables, ${err}`);
  }
};

module.exports = migrateTables;