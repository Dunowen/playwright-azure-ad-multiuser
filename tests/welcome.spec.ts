import { test, expect } from "@playwright/test";

test.describe("admin", () => {
	test.use({ storageState: "temp/adminStorageState.json" });

	test("user has its username displayed", async ({ page }) => {
		await page.goto("/");

		const mainPage = page.locator("div[data-cy=page-home]");
		await expect(mainPage).toContainText("Admin UI Test");
	});
});

test.describe("employee", () => {
	test.use({ storageState: "temp/employeeStorageState.json" });

	test("user has its username displayed", async ({ page }) => {
		await page.goto("/");

		const mainPage = page.locator("div[data-cy=page-home]");
		await expect(mainPage).toContainText("Employee UI Test");
	});
});
