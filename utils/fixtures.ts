import { test as base } from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { LoginPage } from '../pages/login.page'
import { AccountPage } from '../pages/account.page'

// I made this page to keep fixtures in order to avoid code repetition, to keep items organized
type PageFixtures = {
    homePage: BasePage,
    loginPage: LoginPage,
    accountPage: AccountPage
}

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new BasePage(page)
        await use(homePage)
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    accountPage: async ({ page }, use) => {
        const accountPage = new AccountPage(page)
        await use(accountPage)
    },
})