import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

test('Logged in user can add products to bag', {
    tag: '@positive'
}, async ({ page }) => {
    const loginPage = new LoginPage(page)

    await test.step('Log in through home page', async () => {
        await loginPage.login(page)
        await loginPage.validateUserIsLoggedIn()
    })
    await test.step('User can add products to bag', async () => {
        
    })
})
