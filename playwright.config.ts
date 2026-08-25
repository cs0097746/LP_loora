import { defineConfig, devices } from '@playwright/test';

const host = '127.0.0.1';
const baseURL = `http://${host}:3000`;

export default defineConfig({
  testDir: './playwright',
  use: { baseURL, trace: 'on-first-retry' },
  webServer: {
    command: process.env.CI
      ? `npm run start -- --hostname ${host}`
      : `npm run dev -- --hostname ${host}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
