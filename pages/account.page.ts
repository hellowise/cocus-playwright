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

    async validateAccountPage() { 
        await expect(this.accountSidebar, 'Waiting for account sidebar to be visible').toBeVisible()
        await expect(this.summary, 'Waiting for summary button to be visible').toBeVisible()
        await expect(this.transactions, 'Waiting for transactions button to be visible').toBeVisible()
        await expect(this.return, 'Waiting for returns button to be visible').toBeVisible()
        await expect(this.delivery, 'Waiting for delivery button to be visible').toBeVisible()
    }

}