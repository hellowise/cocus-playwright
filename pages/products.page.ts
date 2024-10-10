import test, { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'
import { BasePage } from './base.page'
import { randomIntFromRange, selectRandom } from '../utils/helpers'

export class ProductsPage extends BasePage {

    protected productList: Locator
    protected sortByButton: Locator
    protected productsPerPageButton: Locator
    protected products: Locator
    protected header: Locator
    protected productTitle: Locator
    protected addToBagButton: Locator
    protected sizeGuide: Locator
    protected sizeSelector: Locator
    protected postAddToBag: Locator
    protected closePostAddToBag: Locator

    constructor(page: Page)  {
        super(page)
        // General catalog page
        this.productList = page.locator('div.product-lister__content')
        this.sortByButton = this.productList.locator('#sortBy:visible')
        this.productsPerPageButton = this.productList.locator('#productsPerPage')
        this.products = this.productList.locator('a.product__link.product__link')
        
        // Separate product elements >> should use separate pages for catalog / separate item page for bigger projects.
        this.productTitle = this.page.locator('#productTitle')
        this.addToBagButton = this.page.locator('a[name="addToBag-main"]')
        this.sizeGuide = this.page.locator('#sizeGuideButton')
        this.sizeSelector = this.page.locator('select[id*="optionSize"]')
        this.postAddToBag = this.page.locator('div#postAddToBagModal')
        this.closePostAddToBag = this.postAddToBag.locator('div.modal-close')
    }

    /**
     * Will add a random item from the current catalog to the bag. Need to be called on catalog page.
    */
    async addRandomItemToBag() {
        // Adds a random catalog item to bag
        const randomItem = await randomIntFromRange(await this.products.count())
        await this.openItemInPosition(randomItem)

        // Here we need an extra step to choose SIZE in case we are dealing with clothes.
        if (await this.sizeSelector.count() >= 1) {
            // Some items have no size selector, some have it saying single size, this is here to as a treatment to that.
            if (await this.sizeSelector.locator('option').count() >= 1) {
                await selectRandom(this.sizeSelector)
            }
        }

        // In case item in specific selected size is out of stock, needs a treatment, we will not dwell into that because it would be more time consuming.
        await test.step('Adding random selected item to bag', async () => {
            await expect(this.addToBagButton, 'Expecting add to bag to be enabled').toBeEnabled()
            await this.addToBagButton.click()
            await expect(this.postAddToBag, 'Expecting post add to bag modal to show up').toBeVisible()
        })

        await test.step('Close post add to bag modal', async () => {
            await this.closePostAddToBagModal()
        })
    }

    /**
     * Closes the post add to bag modal screen. Call after adding item to bag.
    */
    async closePostAddToBagModal() {
        await this.closePostAddToBag.click()
        await expect(this.closePostAddToBag, 'Expect post add to bag model to not be visible').not.toBeVisible()
    }

    /**
     * Will open specified item from catalog. Need to be called on catalog page.
     *
     * @param position - Position of the catalog item that will be opened.
    */
    async openItemInPosition(position: number) {
        const itemName = await this.products.nth(position).getAttribute('aria-label')
        if (itemName === null ) { throw new Error ('Could not get item name from catalog list') }
        // For additional validation, could save the price of the item and validate it throughout the app screens.

        await test.step(`Clicking item in position ${position}`, async () => {
            await this.products.nth(position).click()
            await expect (this.productTitle, 'Waiting for product page to open').toBeVisible()

            // Item name from catalog comes with "view" in the beginning of the string. Here we remove it manually.
            expect(this.productTitle, 'Validate item name from main catalog page to item page').toHaveText(itemName.replace(/^view\s*/, ''))
        })
    }

}