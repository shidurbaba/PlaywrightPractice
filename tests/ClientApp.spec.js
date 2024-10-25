const{test,expect} = require('@playwright/test');


test('Browser Contect Playwright test', async ({page})=> //fat function to make your funtion lighter
//{browser} - it is global fixture, to use it in your browser. Need to wrap it in curly braces
{
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    await page.goto("https://rahulshettyacademy.com/client")
    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //wait mechanicism - most of the new application will be on network calls. When network calls are done

   // await page.waitForLoadState('networkidle');

   //another wait mechanism - .waitFor();
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);
});
