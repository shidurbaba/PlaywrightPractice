const{expect} = require('@playwright/test');
class ViewPage
{
    constructor(page)
    {
      
        this.orderIdMessage = page.locator(".col-text");
    }
    
   async assertOrderId_matchesFromOriginalOrderId(orderId)
    {
      //View Page
      const orderIdDetail =   await this.orderIdMessage.textContent();

      //Assert orderIdDetail matches our orginal order ID
      await expect(orderId.includes(orderIdDetail)).toBeTruthy();
    }

    
}
module.exports ={ViewPage};