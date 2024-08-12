require('dotenv').config();
const { test: setup } = require("@playwright/test");
const { db } = require("../utils/db");

setup("Setup tests", async ({ page }) => {
  await db.getConnection();
  try {
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS public.messages
      (
          id character varying(36) COLLATE pg_catalog."default" NOT NULL,
          message character varying(500) COLLATE pg_catalog."default" NOT NULL,
          CONSTRAINT messages_pkey PRIMARY KEY (id)
      )
      
      TABLESPACE pg_default;
      
      ALTER TABLE IF EXISTS public.messages
          OWNER to admin;
    `)
    console.log("Created messages table");
  }
  catch(err) {
    console.error(`Error creating messages table, ${err}`)
  }

  // Intercept and block requests for specific files
  await page.route('**/*.{png,json}', route => {
    const url = route.request().url();
    if (url.includes('logo192.png') || url.includes('logo512.png')) {
      route.abort();  // Block the request
    } else {
      route.continue();  // Allow other requests
    }
  });
});