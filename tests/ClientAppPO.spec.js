const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
//Json->String->js object
const dataSet = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')))




test('Browser Contect Playwright test', async ({ page }) => //fat function to make your funtion lighter
//{browser} - it is global fixture, to use it in your browser. Need to wrap it in curly braces
{
    const pom = new POManager(page)
    const loginPage = pom.getLoginPage();
    const productName = dataSet.productName
    const username = dataSet.username
    const password = dataSet.password
    const countryNme = dataSet.countryNme
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboadPage = pom.getDashboardPage();
    await dashboadPage.searchProduct(productName);
    await dashboadPage.navigateToCart();

    const mycartPage = pom.getMyCartPage()
    await mycartPage.validateProduct_NavigateToCheckoutPage();

    const checkoutPage = pom.getCheckoutPage()
    await checkoutPage.selectFromDropDown_dynamicallySelectCountry(countryNme);
    await checkoutPage.assertUsername_thenCheckOut(username);

    const thankyouPage = pom.getThankyouPage()
    const orderId = await thankyouPage.getOrderID();
    await thankyouPage.assertMessage_thenNavigateToOrdersPage();

    const yourOrdersPage = pom.getYourOrdersPage()
    await yourOrdersPage.checkOrderID_thenNavigateToViewPage(orderId);

    const viewPage = pom.getViewPage()
    await viewPage.assertOrderId_matchesFromOriginalOrderId(orderId);

});
