const { test: teardown } = require("@playwright/test");
const { db } = require("../utils/db");

teardown("Remove database connection", async () => {
  if(db) {
    await db.removeConnection();
  }
  else {
    console.error(db);
  }
});