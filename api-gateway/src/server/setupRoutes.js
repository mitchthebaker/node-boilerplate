const setupRoutes = (app) => {
  app.get("/test", async (req, res) => {
    console.log(process.env.NODE_ENV);
    res.send({
      environment: process.env.NODE_ENV,
    });
  });
};

module.exports = setupRoutes;