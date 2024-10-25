
const { POManager } = require('../pageobjects/POManager');
const { customtest } = require('../utils/test-base');


//Note*: Adding fixture call testDataForOrder to parameterize, instead of JSON
customtest(`Client App PO - Parameterized for product Zara`, async ({ page, testDataForOrder }) => {

    const pom = new POManager(page)
    const loginPage = pom.getLoginPage();
    const { productName, username, password, countryNme } = testDataForOrder;
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

customtest(`Client App PO - Parameterized for product Adidas`, async ({ page, testDataForOrder1 }) => {

    const pom = new POManager(page)
    const loginPage = pom.getLoginPage();
    const { productName, username, password, countryNme } = testDataForOrder1;
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
