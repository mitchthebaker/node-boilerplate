const { DataSource } = require("typeorm");
const Message = require("./entities/Message");

const accessEnv = require("@root/helpers/accessEnv");

const AppDataSource = new DataSource({
  type: "postgres",
  username: accessEnv("PG_USER"),
  host: accessEnv("PG_HOST"),
  database: accessEnv("PG_DB"),
  password: accessEnv("PG_PASSWORD"),
  port: accessEnv("PG_PORT"),
  entities: [Message]
});


const initConnection = async () => {
  try {
    await AppDataSource.initialize();
  }
  catch(err) {
    console.error(`Error during DataSource initialization, ${err}`);
  }
};

module.exports = initConnection;