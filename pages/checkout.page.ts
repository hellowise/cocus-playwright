import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'
import { expect } from '@playwright/test'

export class CheckoutPage extends BasePage {

    protected goToCheckoutBottom: Locator
    protected goToCheckoutTop: Locator
    protected promoCode: Locator
    protected promoSignedOutUser: Locator
    protected promoSignedInUser: Locator

    constructor(page: Page)  {
        super(page)
        this.goToCheckoutBottom = page.locator('#goToCheckoutBottom')
        this.goToCheckoutTop = this.page.locator('#goToCheckoutTop')
        this.promoCode = this.page.locator('div.view-bag-promo-code')
        this.promoSignedOutUser = this.promoCode.locator('div.sign-in h2')
        this.promoSignedInUser = this.promoCode.locator('#claim_code_entry_form')
    }

    /**
     * Will validate visibility of go to checkout and payments trigger, and click it.
     * 
     * Call this method only inside checkout page or it will fail.
    */
    async goToDeliveryAndPayment() {
        await expect(this.goToCheckoutTop, 'Expect Go To delivery and Payment button to be visible').toBeVisible()
        // Add randomized pick for bottom or top button
        // Playwright will keep the cursor over the "Go to checkout" button which keeps the top nav bar triggering over the top checkout button in this page, so we can hover the bottom button to make the dropdown disappear, or just use the bottom button
        // As an alternate you could use click force but its preferred not to
        await this.goToCheckoutBottom.click()
    }

    /**
     * Will validate signed out user can shop but not use coupons.
     *
     * Call this method only inside checkout page with a signed out user or it will fail.
    */
    async validateSignedOutUserCheckout() {
        await expect(this.promoSignedOutUser, 'Expect signed out user to have sign in option at checkout').toBeVisible()
        await expect(this.promoSignedOutUser, 'Expect signed out user to not be able to use coupons').toHaveText('Sign in or Register to Apply a Promotional Code', {ignoreCase: true})
    }

    /**
     * Will validate signed in user can shop and use coupons.
     *
     * Call this method only inside checkout page with a signed in user or it will fail.
    */
    async validateSignedInUserCheckout() {
        await expect(this.promoSignedInUser, 'Expect signed in user to have promo code form available').toBeVisible()
        await expect(this.promoCode, 'Expect signed in user to have an option for promo codes').toContainText('Have a promo code?', {ignoreCase: true})
    }

}