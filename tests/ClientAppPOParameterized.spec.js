const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
//Json->String->js object
const dataSet = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')))

//Create a for loop outside of your test to iterate - you are wrapping up this test in a for loop
for(const data of dataSet){

//Note*: To parameterize you need a piece of json data in your test to differentiate else throws error. 
test(`Client App PO - Parameterized for product: ${data.productName}`, async ({ page }) => //fat function to make your funtion lighter
//{browser} - it is global fixture, to use it in your browser. Need to wrap it in curly braces
{
    const pom = new POManager(page)
    const loginPage = pom.getLoginPage();
    const productName = data.productName
    const username = data.username
    const password = data.password
    const countryNme = data.countryNme
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

})

};
