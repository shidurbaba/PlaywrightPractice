const { test, expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        // Add await for the async fill and click operations
        await this.userEmail.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }


}
module.exports = { LoginPage };