const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  retries: 0,
  use: {
    ignoreHTTPSErrors: true,
    headless: true,
  },
  projects: [
    {
      name: "setup db",
      testMatch: /global\.setup\.js/,
      teardown: "cleanup db",
    },
    {
      name: "cleanup db",
      testMatch: /global\.teardown\.js/,
    },
    {
      name: 'Desktop Chromium',
      use: { browserName: 'chromium' },
      dependencies: ["setup db"],
    },
    {
      name: 'Desktop Firefox',
      use: { browserName: 'firefox' },
      dependencies: ["setup db", "Desktop Chromium"],
    },
    {
      name: 'Desktop WebKit',
      use: { browserName: 'webkit' },
      dependencies: ["setup db", "Desktop Chromium", "Desktop Firefox"],
    },
  ],
});