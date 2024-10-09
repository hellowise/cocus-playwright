import { test } from '../utils/fixtures'

test('Logged in user can add items to bag', {
    tag: '@positive'
}, async ({ homePage, loginPage, productsPage, checkoutPage }) => {
    await test.step('Log in through home page', async () => {
        await loginPage.login()
        await loginPage.validateUserIsLoggedIn()
    })
    await test.step('Add item to bag', async () => {
        await homePage.navigateToProducts('Womens', 'Accessories')
        // With more time, we can add validations for the item name, price and picture through the whole process
        await productsPage.addRandomItemToBag()
    })
    await test.step('Proceed to checkout page', async () => {
        await homePage.goToCheckout()
        await checkoutPage.validateSignedInUserCheckout()
        await checkoutPage.goToDeliveryAndPayment()
        // From here we get to the payment page, so I did not continue in prod
    })
})

test('Logged out user can add items to bag', {
    tag: '@positive'
}, async ({ loginPage, homePage, productsPage, checkoutPage }) => {
    await test.step('Add item to bag', async () => {
        await homePage.loadPage()
        await homePage.navigateToProducts('Womens', 'Accessories')
        await productsPage.addRandomItemToBag()
    })
    await test.step('Proceed to checkout page', async () => {
        await homePage.goToCheckout()
        await checkoutPage.validateSignedOutUserCheckout()
        await checkoutPage.goToDeliveryAndPayment()
    })
    await test.step('Signed out user gets redirected to login page', async () => {
        await loginPage.validateLoginScreen()
        // From here we get to the payment page, so I did not continue in prod
    })
})
