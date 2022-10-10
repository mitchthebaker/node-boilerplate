const initConnection = require("@root/db/initConnection");
const startServer = require("@root/server/startServer");

initConnection().then(() => {
  startServer();
});