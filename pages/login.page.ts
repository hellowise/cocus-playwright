import { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'

export class LoginPage {

    private myAccountButton: Locator
    private signInOption: Locator
    private acceptCookiesButton: Locator
    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator

    constructor(page: Page) {
        this.myAccountButton = page.locator('div.gui-my-account-selector')
        this.signInOption = page.locator('a[title="sign in"]')
        this.acceptCookiesButton = page.locator('button#onetrust-accept-btn-handler')
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#signInButton')
    }

    async login(page: Page, username: string, password: string) {
        await page.goto('/', { timeout: 40000 })

        // Handle cookies modal. Since we are running anonymous tabs, this will show up every time
        await expect(this.acceptCookiesButton, 'Waiting for cookies modal to show up').toBeVisible()
        await this.acceptCookiesButton.click()

        // Manually naviate to login through IDE
        await this.myAccountButton.click()
        await expect(this.signInOption, 'Waiting for account options to be ready').toBeVisible()
        await this.signInOption.click()
        
        // Interact with the elements
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}