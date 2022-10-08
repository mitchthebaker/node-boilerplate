const { Client } = require("pg");
const accessEnv = require("@root/helpers/accessEnv");

//const DB_URL = accessEnv("DB_URL");
//console.log(DB_URL)
//
//const client = new Client({ DB_URL });


const client = new Client({
  user: accessEnv("PG_USER"),
  host: accessEnv("PG_HOST"),
  database: accessEnv("PG_DB"),
  password: accessEnv("PG_PASSWORD"),
  port: accessEnv("PG_PORT")
});


const initConnection = async () => {
  await client.connect();
};

module.exports = initConnection;