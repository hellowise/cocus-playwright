import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'

export class CheckoutPage extends BasePage {

    protected goToCheckoutBottom: Locator
    protected goToCheckoutTop: Locator

    constructor(page: Page)  {
        super(page)
        this.goToCheckoutBottom = page.locator('#goToCheckoutBottom')
        this.goToCheckoutTop = this.page.locator('#goToCheckoutTop')
    }

}