const base = require('@playwright/test');

exports.customtest = base.test.extend(

{
//Define your fixture

    testDataForOrder: 
    {
    productName: "ZARA COAT 3",
    username: "anshika@gmail.com",
    password: "Iamking@000",
    countryNme: "India"
    },

    testDataForOrder1: 
    {
    productName: "ADIDAS ORIGINAL",
    username: "anshika@gmail.com",
    password: "Iamking@000",
    countryNme: "Bangladesh"
    }

}


)