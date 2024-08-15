const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  retries: 0,
  use: {
    //baseUrl: "http://127.0.0.1:3000",
    ignoreHTTPSErrors: true,
    headless: true,
    //screenshot: 'only-on-failure',
    //video: 'retain-on-failure',
    //trace: 'retain-on-failure',
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
    //{
    //  name: 'Desktop WebKit',
    //  use: { browserName: 'webkit' },
    //  dependencies: ["setup db"],
    //},
  ],
  // Configure web server for client-app
  //webServer: [
  //  {
  //    command: 'npm start:client',
  //    url: 'http://127.0.0.1:3000',
  //    reuseExistingServer: true,
  //  },
  //  {
  //    command: 'npm start:api-gateway',
  //    url: 'http://127.0.0.1:3001',
  //    reuseExistingServer: true,
  //  },
  //]
});