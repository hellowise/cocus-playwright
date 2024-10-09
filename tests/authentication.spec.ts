import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

test('User can log in successfully', {
    tag: '@positive'
}, async ({ page }) => {
    const loginPage = new LoginPage(page)

    await test.step('Log in through home page', async () => {
        await loginPage.login(page)
    })
    await test.step('Verify user is logged in', async () => {
        await loginPage.validateUserIsLoggedIn()
    })
})

test('User can log out successfully', {
    tag: '@positive'
}, async ({ page }) => {
    const loginPage = new LoginPage(page)

    await test.step('Log in through home page', async () => {
        await loginPage.login(page)
    })
    await test.step('Verify user is logged in', async () => {
        await loginPage.validateUserIsLoggedIn()
    })
    await test.step('Log out from account', async () => {
        await loginPage.logout(page)
    })
})