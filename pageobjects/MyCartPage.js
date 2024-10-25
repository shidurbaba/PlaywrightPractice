const{expect} = require('@playwright/test');
class MyCartPage
{
    constructor(page)
    {
      
        //this.productZaraCoat = page.locator("h3:has-text('ZARA COAT 3");
        this.productName = page.locator(".cart h3");
        this.checkOutButton = page.locator("text=Checkout");
        
    }
    
   async validateProduct_NavigateToCheckoutPage()
    {
        const isVisible =  await this.productName.isVisible();   //h3 is a pseudo-class, this is another way to find by text - new edition
        await expect(isVisible).toBeTruthy();       //.isVisible() returns a boolean value
        await this.checkOutButton.click();
    }

    
}
module.exports ={MyCartPage};