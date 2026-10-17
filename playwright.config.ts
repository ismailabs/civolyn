import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  webServer: {
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
