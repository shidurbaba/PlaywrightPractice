const{expect} = require('@playwright/test');
class ThankyouPage
{
    constructor(page)
    {
      
        this.message = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersPage = page.locator("button[routerlink*='myorders']");
        this.bodyToLoad = page.locator("tbody");
    }
    
   async assertMessage_thenNavigateToOrdersPage()
    {
        //Assert Message
        await expect(this.message).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderID.textContent();
        console.log(orderId);

        //Click on Orders Header Button from Checkout Page
        await this.ordersPage.click();

        //Wait for table shows up

        await this.bodyToLoad.waitFor();
        
    }

    async  getOrderID()
    {
        const orderId = await this.orderID.textContent();
        return orderId.trim();
    }

   

    
}
module.exports ={ThankyouPage};