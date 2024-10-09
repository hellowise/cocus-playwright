import { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'

// Page to keep common locators and methods that can be used throughout the application, regardless of page
export class BasePage {

    protected page: Page
    protected myAccountButton: Locator
    protected signInOption: Locator
    protected signOutOption: Locator
    protected acceptCookiesButton: Locator    

    constructor(page: Page) {
        this.page = page
        this.myAccountButton = page.locator('div.gui-my-account-selector')
        this.signInOption = page.locator('a[title="sign in"]')
        this.signOutOption = page.locator('a[title="sign out"]')
        this.acceptCookiesButton = page.locator('button#onetrust-accept-btn-handler')
    }

    async handleCookiesModal() {
        // Handle cookies modal. Since we are running anonymous tabs, this will show up every time
        await expect(this.acceptCookiesButton, 'Waiting for cookies modal to show up').toBeVisible()
        await this.acceptCookiesButton.click()
        await expect(this.acceptCookiesButton, 'Waiting for cookies modal to disappear').not.toBeVisible()
        // Depending on page behavior, this could be replaced with a try catch: for example, if cookie modal shows up in different occasions, but this works for this case
    }

    async validateUserIsLoggedIn() {
        // Validate my account options for logged in user
        await this.myAccountButton.click()
        await expect(this.signInOption, 'Expect sign in to not be available to logged in user').not.toBeVisible()
        await expect(this.signOutOption, 'Expect sign out to be available to logged in user').toBeVisible()
        // Ideally we would validate every option in the my account dropdown, for for simplicity lets just check sign in for now

        await this.myAccountButton.click()
        await expect(this.signOutOption).not.toBeVisible()
        // Close my account dropdown after checks
    }

    async logout() {
        // Logs out of current account
        await this.myAccountButton.click()
        await expect(this.signOutOption, 'Expect sign out to be available to logged in user').toBeVisible()
        await this.signOutOption.click()

        // After log out user is redirected to home page with unique sign off url
        expect(this.page.url()).toContain('signoff=yes')

        // Validates logged out
        await this.myAccountButton.click()
        await expect(this.signOutOption, 'Expect sign out to not be available to user not logged in').not.toBeVisible()
        await expect(this.signInOption, 'Expect sign in to be available').toBeVisible()
        // An idea here is to add a screenshot test to validate user is redirected to home page
    }
}