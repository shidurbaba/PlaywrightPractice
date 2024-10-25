const{test,expect} = require('@playwright/test');


test('Browser Contect Playwright test', async ({page})=> 
{
    const productName = 'ZARA COAT 3';
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const products = page.locator(".card-body");
    const email = "anshika@gmail.com";
    const ordersPage = page.locator("button[routerlink*='myorders']");
    await page.goto("https://rahulshettyacademy.com/client")
    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
   
    //store all product in a variable
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    //await page.pause();
    //Scenario: Iterate throw all the product and check for Zara Coat 3 is there
    const count = await  products.count() // returns numbers of matching in these selector
    for(let i = 0; i < count; i++)
        {
          if(await products.nth(i).locator("b").textContent() === productName)  
          {
            // add to cart
                await products.nth(i).locator("text=  Add To Cart").click();
                break;
          }
        }

        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor(); //Autowait is not provided for .isVisible() method - we want the screen to load

        const isVisible =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible();   //h3 is a pseudo-class, this is another way to find by text - new edition
        await expect(isVisible).toBeTruthy();       //.isVisible() returns a boolean value

        //Checkout
        await page.locator("text=Checkout").click();
        //Type slowly - Use PressSequentially 
        await page.locator("[placeholder*='Country']").pressSequentially("ind");

        //dynamic dropdown
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionCount = await dropdown.locator("button").count();

        for(let i =0; i< optionCount; i++)
            {
             const text =  await dropdown.locator("button").nth(i).textContent();

              if(text.trim() === "India") //needs to be exact text, so use trim
                {
                    await dropdown.locator("button").nth(i).click();
                    break;
                }      
            }
        
            //Assert email on checkout page
       await expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);
            
        //Click on Place Order
        await page.locator("text=Place Order ").click();

        //Assert Message
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

        //Click on Orders Header Button from Checkout Page
        await ordersPage.click();

        //Wait for table shows up

        await page.locator("tbody").waitFor();

        //Iterator over the list of orders, if order ID matches orderId then click on View Button
        
        const rowsCount = await page.locator("tbody tr").count(); //retrieves count of order id as list
        const rowsOrderList = page.locator("tbody tr");    

        for(let i=0; i<rowsCount; i++)
            {
               const rowOrderID = await rowsOrderList.nth(i).locator("th").textContent();

               if(orderId.includes(rowOrderID))
                {
                  await rowsOrderList.nth(i).locator("button").first().click();
                  break;
                }
            }
      //View Page
      const orderIdDetail =   await page.locator(".col-text").textContent();

      //Assert orderIdDetail matches our orginal order ID
      await expect(orderId.includes(orderIdDetail)).toBeTruthy();
});
