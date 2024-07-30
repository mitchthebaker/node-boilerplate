const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  retries: 0,
  use: {
    //baseUrl: "http://127.0.0.1:3000",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: "setup db",
      testMatch: /global\.setup\.js/,
      //teardown: "cleanup db",
    },
    //{
    //  name: "cleanup db",
    //  testMatch: /global\.teardown\.js/,
    //},
    {
      name: 'Desktop Chromium',
      use: { browserName: 'chromium' },
      //dependencies: ["setup db"],
    },
    
    //{
    //  name: 'Desktop Firefox',
    //  use: { browserName: 'firefox' },
    //},
    //{
    //  name: 'Desktop WebKit',
    //  use: { browserName: 'webkit' },
    //},
  ],
    // Configure web server for client-app
    webServer: {
      command: 'npm start',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
    },
});