const { defineConfig } = require('@playwright/test');
const path = require('path');

process.env.WP_ARTIFACTS_PATH ??= path.join( process.cwd(), 'artifacts' );
process.env.STORAGE_STATE_PATH ??= path.join(
	process.env.WP_ARTIFACTS_PATH,
	'storage-states/admin.json'
);

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  globalSetup: require.resolve( '@wordpress/scripts/config/playwright/global-setup.js' ),
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: process.env.WP_BASE_URL || 'http://localhost:8889',
    trace: 'on-first-retry',
    storageState: process.env.STORAGE_STATE_PATH,
  },
});
