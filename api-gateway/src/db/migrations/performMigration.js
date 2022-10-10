const pool = require("@root/db/connection");
const fs = require("fs");

let insertTables = fs.readFileSync(`${__dirname}/sql/insertTables.sql`).toString();

const performMigration = async () => {
  try {
    await pool.query(insertTables);
    console.log("Migration successful");
  }
  catch(err) {
    console.error(`Error when creating tables, ${err}`);
  }
};

module.exports = performMigration;