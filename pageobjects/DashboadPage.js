const{test,expect} = require('@playwright/test');
class DashboardPage
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.pageToload = page.locator("div li");
        
    }
    
   async searchProduct(productName)
    {
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await  this.products.count() // returns numbers of matching in these selector
    for(let i = 0; i < count; i++)
        {
          if(await this.products.nth(i).locator("b").textContent() === productName)  
          {
            // add to cart
                await this.products.nth(i).locator("text=  Add To Cart").click();
                break;
          }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
        await this.pageToload.first().waitFor()
    }

    
}
module.exports ={DashboardPage};