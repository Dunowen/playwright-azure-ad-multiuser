import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
	const browser = await chromium.launch();

	// admin
	const adminPage = await browser.newPage();
	await adminPage.goto(config.projects[0].use.baseURL!);
	await adminPage.fill("input[type=email]", process.env.ADMIN_USERNAME!);
	await adminPage.click("input[type=submit]");
	await adminPage.fill("input[type=password]", process.env.ADMIN_PASSWORD!);
	await adminPage.click("input[type=submit]");
	await adminPage.waitForSelector(".identity");
	await adminPage.click("input[type=submit]");
	await adminPage.waitForSelector(".p-card-body");
	await adminPage.context().storageState({ path: "temp/adminStorageState.json" });

	// employee
	const employeePage = await browser.newPage();
	await employeePage.goto(config.projects[0].use.baseURL!);
	await employeePage.fill("input[type=email]", process.env.EMPLOYEE_USERNAME!);
	await employeePage.click("input[type=submit]");
	await employeePage.fill("input[type=password]", process.env.EMPLOYEE_PASSWORD!);
	await employeePage.click("input[type=submit]");
	await employeePage.waitForSelector(".identity");
	await employeePage.click("input[type=submit]");
	await employeePage.waitForSelector(".p-card-body");
	await employeePage.context().storageState({ path: "temp/employeeStorageState.json" });

	await browser.close();
}

export default globalSetup;
