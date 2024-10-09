import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'

export class AccountPage extends BasePage {

    public accountSidebar: Locator
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

}