import { defineConfig, devices } from '@playwright/test';
import { publicDnsArgs } from './scripts/verification-dns.mjs';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      'json',
      {
        outputFile:
          process.env.PLAYWRIGHT_JSON_OUTPUT_NAME ||
          'artifacts/qa/playwright.json',
      },
    ],
  ],
  use: {
    baseURL: process.env.TEST_ORIGIN || 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    launchOptions: { args: publicDnsArgs },
  },
  webServer: process.env.TEST_ORIGIN
    ? undefined
    : {
        command: 'node scripts/serve.mjs',
        url: 'http://127.0.0.1:4321',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(process.env.CROSS_BROWSER === '1'
      ? [
          {
            name: 'firefox',
            testMatch: 'engines.spec.ts',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'webkit',
            testMatch: 'engines.spec.ts',
            use: { ...devices['Desktop Safari'] },
          },
        ]
      : []),
  ],
});
