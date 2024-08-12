const { Pool } = require('pg');

class DB {
  pool;

  DBConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  };

  async getConnection() {
    try {
      if (this.pool === null || this.pool === undefined) {
        this.pool = new Pool(this.DBConfig);
      }
      return this.pool;
    } 
    catch(err) {
      console.error(`X Failed to connect to database \n\n ${err}`);
      process.exit(1);
    }
  }

  async removeConnection() {
    try {
      if (this.pool) {
        await this.pool.end();
      }
    } 
    catch(err) {
      console.error(`Error when removing database connection, ${err}`);
      process.exit(1);
    }
  }

  async executeQuery(query, args) {
    try {
      const client = await this.getConnection();
      const result = await client.query(query, args);
      return result;
    } 
    catch (err) {
      console.error("Error executing query:", err);
    }
  }
}

const db = new DB();

module.exports = { db };