const{test,expect} = require('@playwright/test');


test('Browser Contect Playwright test', async ({page})=> 
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const terms = page.locator("#terms");
    const cardTitles = page.locator(".card-body a");
    const documentLink = page.locator("[href*='documents-request']");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await dropdown.selectOption("teach");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); // toBeChecked() is an assertion

    console.log(await page.locator(".radiotextsty").last().isChecked()); //isChecked() returns a boolean value of true or false

    //playwright inspector- page.pause();
    //await page.pause();

    await page.locator("#signInBtn").click();
    console.log( await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //to clear the existing content
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await terms.click();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy(); //toBeFalsy returns false, the action is performed inside the brackets then await should be inside.
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); //assertion checks attribute contains value

    //npx playwright test test/ControlsChild.spec.js --debug (this will run in debug mode)
    //this will open Playwright debuger to locate elements and assert values.
    // npx playwright codgen http://google.com (google.com you want to record and automate)

  await page.getByRole('link', { name: 'terms and conditions' }).click();



    await signIn.click();

    console.log(await cardTitles.first().textContent()); //using css get the nth index of 0 which is the first element
    
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

});

test('Child window handle', async ({browser})=>
 {
        const context = await browser.newContext();
        const page =   await context.newPage(); // on this page you will hit your url
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        const documentLink = page.locator("[href*='documents-request']");

        const[newPage] = await Promise.all
        (
             //following scripts will take array of promises
              //listen for any new page pending, a new page rejected, or a new page fulfilled.
              //Until promises are not fulfilled, it will proceed
        [context.waitForEvent('page'),
        documentLink.click(),]
        )
        const text = await newPage.locator(".red").textContent();
        console.log(text);
        const arraySplit = text.split("@");
        const email = arraySplit[1].split(" ")[0]; //again apply split
        console.log(email);

        //Switch back to parent window
        await page.locator("#username").fill(email);
        await page.pause();
       console.log(await page.locator("#username").textContent());
    
 })

