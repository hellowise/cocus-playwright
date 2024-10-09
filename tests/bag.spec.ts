import { test } from '../utils/fixtures'

test('Logged in user can add items to bag', {
    tag: '@positive'
}, async ({ homePage, loginPage, productsPage }) => {
    await test.step('Log in through home page', async () => {
        await loginPage.login()
        await loginPage.validateUserIsLoggedIn()
    })
    await test.step('Add item to bag', async () => {
        await homePage.navigateToProducts('Womens', 'Accessories')
        await productsPage.addRandomItemToBag()
    })
    await test.step('Proceed to checkout page', async () => {
        await homePage.goToCheckout()
    })
})

test('Logged out user can add items to bag', {
    tag: '@positive'
}, async ({ homePage, productsPage }) => {
    await test.step('Add item to bag', async () => {
        await homePage.loadPage()
        await homePage.navigateToProducts('Womens', 'Accessories')
        await productsPage.addRandomItemToBag()
    })
    await test.step('Proceed to checkout page', async () => {
        await homePage.goToCheckout()
    })
})
