import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["list"], ["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.UI_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* separate projects for auth setup, API tests and authenticated UI tests */
  projects: [

    // setup project: runs auth.setup.ts first to log in via API
    // save the authenticated browser state to .auth/user.json and prepare it for authenticated UI tests
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    // api project: runs API specs, authentication is provided by authenticatedRequest fixture
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
    },


    // chromium project: runs UI specs in Chrome using authenticated state created by setup
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",  // load saved login state so authenticated UI tests can skip login flow
      },
      dependencies: ["setup"], // run setup project first so storageState file is ready
      testMatch: /.*\.ui\.spec\.ts/,
    },

    /*
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
