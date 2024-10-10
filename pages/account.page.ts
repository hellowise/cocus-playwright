import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'
import { expect } from '@playwright/test'

export class AccountPage extends BasePage {

    protected accountSidebar: Locator
    protected summary: Locator
    protected transactions: Locator
    protected return: Locator
    protected delivery: Locator

    constructor(page: Page)  {
        super(page)
        this.accountSidebar = page.locator('#maSideNavContainer')
        this.summary = this.accountSidebar.locator('#summaryNav')
        this.transactions = this.accountSidebar.locator('#acctTransActsNav')
        this.return = this.accountSidebar.locator('#arngeReturnNav')
        this.delivery = this.accountSidebar.locator('#deliverySubscriptionsNav')
    }

    /**
     * Validates the account page through checking visibility of sidebar first items. Will fail if not called inside accounts page.
     * 
     * Can be expanded to validate every item on the account page, or shortened to only important ones.
    */
    async validateAccountPage() { 
        await expect(this.accountSidebar, 'Waiting for account sidebar to be visible').toBeVisible()
        await expect(this.summary, 'Waiting for summary button to be visible').toBeVisible()
        await expect(this.transactions, 'Waiting for transactions button to be visible').toBeVisible()
        await expect(this.return, 'Waiting for returns button to be visible').toBeVisible()
        await expect(this.delivery, 'Waiting for delivery button to be visible').toBeVisible()
    }

}