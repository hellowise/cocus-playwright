import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('User can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(page, process.env.EMAIL!, process.env.PASSWORD!);

    // Add assertions after login
    expect(await page.title()).toBe('Dashboard');
})