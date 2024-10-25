const{expect} = require('@playwright/test');
class CheckoutPage
{
    constructor(page)
    {
      
        this.typeCountryName = page.locator("[placeholder*='Country']");
        this.countryDropDownResults = page.locator(".ta-results");
        this.usernameEmail = page.locator(".user__name  [type='text']");
        this.placeorderbutton = page.locator("text=Place Order ");
    }
    
   async selectFromDropDown_dynamicallySelectCountry(countryNme)
    {
        await this.typeCountryName.pressSequentially(countryNme);

        //dynamic dropdown
        const dropdown = this.countryDropDownResults;
        await dropdown.waitFor();
        const optionCount = await dropdown.locator("button").count();

        for(let i =0; i< optionCount; i++)
            {
             const text =  await dropdown.locator("button").nth(i).textContent();

              if(text.trim() === countryNme) //needs to be exact text, so use trim
                {
                    await dropdown.locator("button").nth(i).click();
                    break;
                }      
            }
    }

    async assertUsername_thenCheckOut(username)
    {
        //Assert email on checkout page
        await expect(this.usernameEmail.first()).toHaveText(username);
            
        //Click on Place Order
        await this.placeorderbutton.click();
    }

    
}
module.exports ={CheckoutPage};