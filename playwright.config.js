const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: process.env.WP_BASE_URL || 'http://localhost:8889',
    trace: 'on-first-retry',
  },
});
