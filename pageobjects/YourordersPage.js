const{expect} = require('@playwright/test');
class YourordersPage
{
    constructor(page)
    {
      
        this.ordertable = page.locator("tbody tr");
    }
    
   async checkOrderID_thenNavigateToViewPage(orderId)
    {
        const rowsCount = await this.ordertable.count(); //retrieves count of order id as list
        const rowsOrderList = await this.ordertable;    

        for(let i=0; i<rowsCount; i++)
            {
               const rowOrderID = await rowsOrderList.nth(i).locator("th").textContent();

               if(orderId.includes(rowOrderID))
                {
                  await rowsOrderList.nth(i).locator("button").first().click();
                  break;
                }
            }
        
    }

    
}
module.exports ={YourordersPage};