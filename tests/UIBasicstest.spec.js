const{test,expect} = require('@playwright/test');


test('Browser Contect Playwright test', async ({browser})=> //fat function to make your funtion lighter
//{browser} - it is global fixture, to use it in your browser. Need to wrap it in curly braces
{
    

    //browser.newContext fresh and new instance. Pass parameters for proxies 
    const context = await browser.newContext();
    const page =   await context.newPage(); // on this page you will hit your url
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    //css, xpath - playwright redominately suggests using css selector.
    //Store webelements in const 
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const terms = page.locator("#terms");
    const cardTitles = page.locator(".card-body a");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
  
    await page.locator("#signInBtn").click();

    //playwright has the intelligence to explicitly wait for the element to show up, no need to declare any webdriverwait class
    console.log( await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //to clear the existing content
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await terms.click();
    await signIn.click();

    console.log(await cardTitles.first().textContent()); //using css get the nth index of 0 which is the first element
    
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

});

// test('First Playwright test', async ({page})=> //test.only will execute "only" this test
// {
//     await page.goto("https://www.google.com/");

//     console.log(await page.title());

//     await expect(page).toHaveTitle("Google"); //Assertion is expect(page).toHaveTitle()

// });