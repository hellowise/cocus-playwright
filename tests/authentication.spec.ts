import { expect } from '@playwright/test'
import { test } from '../utils/fixtures'

test('User can log in successfully', {
    tag: '@positive'
}, async ({ loginPage, accountPage }) => {
    await test.step('Log in through home page', async () => {
        await loginPage.login()
    })
    await test.step('Verify user is logged in', async () => {
        await loginPage.validateUserIsLoggedIn()
        await expect(accountPage.accountSidebar, 'Expect account page to be visible').toBeVisible()
    })
})

test('User can log out successfully', {
    tag: '@positive'
}, async ({ loginPage, accountPage }) => {
    await test.step('Log in through home page', async () => {
        await loginPage.login()
    })
    await test.step('Verify user is logged in', async () => {
        await loginPage.validateUserIsLoggedIn()
        await expect(accountPage.accountSidebar, 'Expect account page to be visible').toBeVisible()
    })
    await test.step('Log out from account', async () => {
        await loginPage.logout()
        await expect(accountPage.accountSidebar, 'Expect account page to not be visible').not.toBeVisible()
    })
})