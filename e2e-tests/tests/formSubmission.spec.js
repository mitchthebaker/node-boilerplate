const { test, expect } = require("@playwright/test");
const { db } = require("../utils/db");

test.describe("Form Submission E2E Test", () => {
  test("should submit form and save data to the database", async ({ page }) => {
    // Navigate to the client-app
    await page.goto("http://127.0.0.1:3000/");

    // Intercept and block requests for specific files
    await page.route('**/*.{png,json}', route => {
      const url = route.request().url();
      if (url.includes('logo192.png') || url.includes('logo512.png')) {
        route.abort();  // Block the request
      } else {
        route.continue();  // Allow other requests
      }
    });

    // Fill out the form
    await expect(page.getByText("Send a message")).toBeVisible();
    await page.fill('input[id="message-input"]', "Playwright test message");
    
    const responsePromise = page.waitForResponse(res => {
      console.log(res.url(), res.status());
      return res.status() === 200
    });
    await page.click('button[id="submission-button"]');
    const response = await responsePromise;
    console.log(response);

    // Check if form submission adds row to the db
    if(db && response.status === 200) {
      const result = await db.executeQuery(
        "SELECT * FROM messages WHERE message = $1", 
        ["Playwright test message"]
      );
      console.log(result.rows);
      
      await page.reload({ waitUntil: "load" });
      const message = page.getByText("Playwright test message");
      await message.waitFor();
      //await expect(message).toBeVisible();
      await db.executeQuery(
        "DELETE FROM messages WHERE message = $1", 
        ["Playwright test message"]
      );
    }
  });
});
