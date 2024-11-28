const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboadPage');
const { MyCartPage } = require('../pageobjects/MyCartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { ThankyouPage } = require('../pageobjects/ThankyouPage');
const { YourordersPage } = require('../pageobjects/YourordersPage');
const { ViewPage } = require('../pageobjects/ViewPage');
const { CraigListPage } = require('../pageobjects/CraigListPage');
const {RedditPage} = require('../pageobjects/RedditPage');

class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboadPage = new DashboardPage(this.page)
        this.mycartPage = new MyCartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.thankyouPage = new ThankyouPage(this.page)
        this.yourordersPage = new YourordersPage(this.page)
        this.viewpage = new ViewPage(this.page)
        this.craiglistpage = new CraigListPage(this.page);
        this.redditpage = new RedditPage(this.page);


    }
    getRedditPage()
    {
        return this.redditpage
    }

    getCraiglistPage() {
        return this.craiglistpage
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboadPage
    }

    getMyCartPage() {
        return this.mycartPage
    }

    getCheckoutPage() {
        return this.checkoutPage
    }

    getThankyouPage() {
        return this.thankyouPage
    }

    getYourOrdersPage() {
        return this.yourordersPage
    }

    getViewPage() {
        return this.viewpage
    }






}
module.exports = { POManager };