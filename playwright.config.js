// @ts-check
import {defineConfig, devices} from '@playwright/test';
import globalSetup from './global-setup.js';
import globalTeardown from './global-teardown.js';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    /* added instructions from global-setup.js and global-teardown.js
    to implement instructions at the very beginning before all tests
    and after all tests performing
     */
    globalSetup: globalSetup(),
    globalTeardown: globalTeardown(),
    /* Folder with test files*/
    //testDir: './tests',
    /*alternative way to indicate the template of test files*/
    testMatch: /\/tests\/.*\.spec\.js/,
    /* Run tests in files in parallel. If 'true' then don't use before all and after all
    - can be performed not only once */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only (if test in CI - in Hit hub for instance - we perform 2 retries
    locally - no retries)*/
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 3,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL: 'https://qauto.forstudy.space',
        /* credentials if site needs them to open page*/
        httpCredentials: {
            username: 'guest',
            password: 'welcome2qauto'
        },
        screenshot: 'only-on-failure',
        /* size of the opened browser window*/
        viewport: {width: 1280, height: 720},
        /* Allow to implement test without opening browser if option is 'true'*/
        headless: true,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'smoke',
            grep: /@smoke/, /* first option how to say which tests should be run. @smoke - label in test title */
            //testMatch: /\/tests\/smoke\/.*\.spec\.js/,   /* second option how to say where test files */
            use: {...devices['Desktop Chrome']},
        },
        {
            name: 'regression',
            grepInvert: /@smoke/,  /* first option how to say which tests should NOT be run. @smoke - label in test title */
            //testMatch: /\/regression\/.*\.spec\.js/, /* second option how to say where test files */
            use: {...devices['Desktop Chrome']},
        }
        //
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

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

