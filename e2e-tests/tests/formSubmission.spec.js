const { test, expect } = require("@playwright/test");
const { DB } = require("../utils/db");

let db = new DB();

test.describe("Form Submission E2E Test", () => {
  test("should submit form and save data to the database", async ({ page }) => {
    // Navigate to the client-app
    await page.goto("http://127.0.0.1:3000");

    // Fill out the form
    await page.fill('input[id="message-input"]', "Playwright test message");
    await page.click('button[id="submission-button"]');

    await db.getConnection();

    if(db) {
      const result = await db.executeQuery(
        "SELECT * FROM messages WHERE message = $1", 
        ["Playwright test message"]
      );
      console.log(result.rows);
      expect(result.rows).toHaveLength(1);
      
      await page.reload();
      await expect(page.locator("text=Playwright test message")).toBeVisible();

      await db.executeQuery(
        "DELETE FROM messages WHERE message = $1", 
        ["Playwright test message"]
      );
      await db.removeConnection();
    }
  });
});
