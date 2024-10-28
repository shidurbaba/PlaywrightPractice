// @ts-check
const {devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  /* Run tests in files in parallel */
 timeout: 30 * 1000,
 retries: 1,
 workers: 3, //disabling parallel mechanism if set it up to one

 expect: //this is for assertions
 {
    timeout: 10000
 },

 reporter: 'html',

 use: //browser properties, screenshots etc...
  {
      browserName: 'chromium',
      args: ['--start-maximized'],
      headless : false,
      screenshot : 'on', //screenshot configuration - no need to code
    //  trace : 'on' // detailed trace of your automation step to debug your code
      trace : 'retain-on-failure',
      video: 'retain-on-failure'

  },

};

module.exports = config; //export it

