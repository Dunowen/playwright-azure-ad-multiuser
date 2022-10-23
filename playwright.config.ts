import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

require("dotenv").config();

const config: PlaywrightTestConfig = {
	globalSetup: "./global-setup.ts",
	testDir: "./tests",
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: process.env.BASE_URL,
		actionTimeout: 0,
		trace: "on-first-retry",
	},
	outputDir: "test-results/",
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
};

export default config;
