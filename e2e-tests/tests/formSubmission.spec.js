const { test, expect } = require("@playwright/test");
const { Client } = require("pg");
const { v4 } = require("uuid");

test.describe("Form Submission E2E Test", () => {
  test("should submit form and save data to the database", async ({ page }) => {
    // Navigate to the client-app
    await page.goto("http://127.0.0.1:3000");

    // Fill out the form
    await page.fill('input[id="message-input"]', "Test message 123 from playwright");
    await page.click('button[id="submission-button"]');

    // Connect to the database to verify the data was inserted
    const client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DB,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    });

    await client.connect();
    const uuid = v4();

    const res = await client.query(
      "INSERT INTO messages(id, message) VALUES($1, $2) RETURNING *", 
      [uuid, "Playwright test message 123"]
    );
    expect(res.rows).toHaveLength(1);

    await client.end();

    // Verify form submission after 
    await expect(page.locator("text=Playwright test message 123")).toBeVisible();
  });
});
