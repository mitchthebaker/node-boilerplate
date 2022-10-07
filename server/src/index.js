import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/test", async (req, res) => {
  console.log(process.env.NODE_ENV);
  res.send({
    environment: process.env.NODE_ENV,
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://0.0.0.0:${PORT}`);
});