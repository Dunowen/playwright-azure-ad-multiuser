import { chromium, FullConfig, Page } from "@playwright/test";

async function globalSetup(config: FullConfig) {
	const browser = await chromium.launch();

	// admin
	const adminPage = await browser.newPage();
	await adminPage.goto(config.projects[0].use.baseURL!);
	await storeAuthenticationState(adminPage, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!, "admin");

	// employee
	const employeePage = await browser.newPage();
	await employeePage.goto(config.projects[0].use.baseURL!);
	await storeAuthenticationState(employeePage, process.env.EMPLOYEE_USERNAME!, process.env.EMPLOYEE_PASSWORD!, "employee");

	await browser.close();
}

async function storeAuthenticationState(page: Page, username: string, password: string, type: string) {
	await page.fill("input[type=email]", username);
	await page.click("input[type=submit]");
	await page.fill("input[type=password]", password);
	await page.click("input[type=submit]");
	await page.waitForSelector(".identity");
	await page.click("input[type=submit]");
	await page.waitForSelector(".p-card-body");
	await page.context().storageState({ path: `temp/${type}StorageState.json` });
}

export default globalSetup;
