const initConnection = require("@root/db/connection");
const startServer = require("@root/server/startServer");

initConnection().then(() => {
  startServer();
});

//startServer();