const { test, expect } = require("@playwright/test");
const { db } = require("../utils/db");

test.describe("Form Submission e2e Test", () => {
  test(`if form data is correctly saved to the database`, async ({ page }) => {
    // Navigate to client app
    await page.goto(process.env.CLIENT_APP_URI);
    await expect(page.getByText("Send a message")).toBeVisible();

    // Fill out the form
    await page.fill('input[id="message-input"]', "Playwright test message");
    const responsePromise = page.waitForResponse(res => 
      res.url().includes("/messages") && 
      res.status() === 200
    );
    await page.click('button[id="submission-button"]');
    const response = await responsePromise;

    // Check if form submission adds row to the db
    if(db && response.status() === 200) {
      await page.reload({ waitUntil: "load" });
      const message = page.getByText("Playwright test message");
      await message.waitFor();
      await expect(message).toBeVisible();
      await db.executeQuery(
        "DELETE FROM public.messages WHERE message = $1", 
        ["Playwright test message"]
      );
    }
  });
});
