import { test } from '../utils/fixtures'

test('User can log in successfully', {
    tag: '@positive'
}, async ({ loginPage, accountPage }) => {
    await test.step('Log in through home page', async () => {
        await loginPage.login()
    })
    await test.step('Verify user is logged in', async () => {
        await loginPage.validateUserIsLoggedIn()
        await accountPage.validateAccountPage()
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
        await accountPage.validateAccountPage()
    })
    await test.step('Log out from account', async () => {
        await loginPage.logout()
    })
})