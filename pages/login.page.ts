import { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'

export class LoginPage extends BasePage {

    protected usernameInput: Locator
    protected passwordInput: Locator
    protected loginButton: Locator

    constructor(page: Page)  {
        super(page)
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#signInButton')
    }

    /**
     * Validates login elements visibility.
    */
    async validateLoginScreen() {
        await expect(this.usernameInput, 'Waiting for username input to be visible').toBeVisible()
        await expect(this.passwordInput, 'Waiting for password input to be visible').toBeVisible()
        await expect(this.loginButton, 'Waiting for login button to be visible').toBeVisible()
    }

    /**
     * Logs into application with given credentials.
     * 
     * If no username and password are given, assign default env ones.
     * @param username - Username to be used on login.
     * @param password - Password for given username.
    */
    async login(username?: string, password?: string) {
        username??= process.env.EMAIL
        password??= process.env.PASSWORD

        // Login cannot be completed if either username of password are undefined, throws error
        if (username == undefined || password == undefined) {
            throw new Error('Please provide username and password to complete login')
        }

        await this.loadPage()

        // Manually naviate to login through IDE
        await this.myAccountButton.click()
        await expect(this.signInOption, 'Waiting for account options to be ready').toBeVisible()
        await this.signInOption.click()
        
        // Interact with the elements
        await this.validateLoginScreen()
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)

        await expect(this.loginButton, 'Expect login button to be enabled').toBeEnabled()
        await this.loginButton.click()

        // Wait until redirected out of login page after login
        await expect(this.loginButton, 'Expected to be redirected out of login page after login').not.toBeVisible()

        // Expect statements can be either inside functions here or inside a test step in the test spec file, here I placed it here for simplicity and avoid repetition
        expect(await this.page.title(), 'Validating user was redirected to account page after login').toContain('My Account')
        await this.page.waitForLoadState()
    }

}