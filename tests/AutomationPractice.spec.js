const{test,expect} = require('@playwright/test');


test('AutomationPractice Popup Playwright test', async ({page})=> 
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        // await page.goto("http://google.com");
        // await page.goBack();
        // await page.goForward();

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();

        //Method will check if the textbox filled is hidden or not
        await expect(page.locator("#displayed-text")).toBeHidden();

        //Handle Alert Popups - popups are not webased
        await page.locator("#confirmbtn").click();
        //this is a listener method
        await page.on("dialog",dialog=> dialog.accept());

        //Hover over method to hover
        await page.locator("#mousehover").hover();

        //Frames - switch between frames
        const framepage = page.frameLocator("iframe[name='iframe-name']");
        //Playwright will focus only on visible locator element in this css selector
        await framepage.locator("li a[href*='lifetime-access']:visible").click();
         // Retrieve and log the text content
         const textCheck = await framepage.locator(".text h2").textContent();
        console.log(textCheck.split(" ")[1]);
    });