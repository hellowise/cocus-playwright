import test, { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'
import { NavigationBarItems, WomensSubItems } from '../utils/types'

// Page to keep common locators and methods that can be used throughout the application, regardless of page
export class BasePage {

    protected page: Page
    protected myAccountButton: Locator
    protected signInOption: Locator
    protected signOutOption: Locator
    protected acceptCookiesButton: Locator  
    protected topNavigationBar: Locator
    protected topNavItems: Locator
    protected topNavSubItems: Locator
    protected subItems: Locator
    protected productsHeader: Locator
    protected myBagButton: Locator
    protected myBagGoToCheckout: Locator

    constructor(page: Page) {
        this.page = page
        this.myAccountButton = page.locator('div.gui-my-account-selector')
        this.signInOption = page.locator('a[title="sign in"]')
        this.signOutOption = page.locator('a[title="sign out"]')
        this.acceptCookiesButton = page.locator('button#onetrust-accept-btn-handler')
        this.topNavigationBar = page.locator('div.gui-nav-container')
        // Could have used a switch case and mapped every ID for these items, in a bigger project, but only marked visible to make it faster here
        this.topNavItems = this.topNavigationBar.locator('li.gui-sub-nav:visible')
        this.topNavSubItems = this.page.locator('div.gui-sub-nav-content:visible')
        this.subItems = this.topNavSubItems.locator('li > a:visible')
        this.productsHeader = this.page.locator('div.category-header__text')
        this.myBagButton = this.page.locator('button.gui-minibag-show')
        this.myBagGoToCheckout = this.page.locator('a#MBcheckout')
    }

    async loadPage() {
        await this.page.goto('/')
        await this.handleCookiesModal()
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

    /**
     * Navigates to a sub page through top navigation bar
     * 
     * @param navigationBarItem - The navigation bar item to be hovered over.
     * @param navigationSubItem - The sub item inside that container to be selected and navigated to.
    */
    async navigateToProducts(navigationBarItem: NavigationBarItems, navigationSubItem: WomensSubItems) {
        // I was forced to use text in this occasion because not every element had title / name
        // We can also use a switch case and map every item id, though it would take more work, but should be done in bigger projects
        await test.step(`Navigating to ${navigationBarItem} > ${navigationSubItem}`, async () => {
            (await this.getNavigationBarItem(navigationBarItem)).hover()
            await expect(this.topNavSubItems, 'Waiting for sub item list to show up').toBeVisible()
            await this.subItems.getByText(navigationSubItem, {exact: true}).click()
        })
        await expect(this.productsHeader, 'Expect that header description includes sub item').toContainText(navigationSubItem)
    }

    async getNavigationBarItem(navigationBarItem: string) {
       return this.page.locator(`a[id*='topNav']:has-text('${navigationBarItem}'):visible`)
    }

    async goToCheckout() {
        // Go to checkout by clicking the my bag button on the top right corner
        // Need to be called only if items are added to bag, or checkout option will not be available
        await this.myBagButton.click()
        await expect(this.myBagGoToCheckout, 'Waiting for go to checkout option').toBeVisible()
        await this.myBagGoToCheckout.click()
    }
}