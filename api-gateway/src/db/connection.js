const { Pool } = require("pg");

const accessEnv = require("@root/helpers/accessEnv");

const pool = new Pool({
  user: accessEnv("PG_USER"),
  host: accessEnv("PG_HOST"),
  database: accessEnv("PG_DB"),
  password: accessEnv("PG_PASSWORD"),
  port: accessEnv("PG_PORT")
});

/*const query = async (text, params) => {
  const result = pool.query(text, params);
  return result;
};*/

module.exports = pool;