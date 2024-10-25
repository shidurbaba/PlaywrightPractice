const{test,expect} = require('@playwright/test');


test('Browser Contect Playwright test', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //getByLabel - any text in label tag you can use this method to click, check and other operations eventhough it is a text label
    // sometimes it won't work if you are typing but works for selection options like clicking, checking, or selecting dropdown

    // await page.getByRole("textbox", {name: 'name'}).fill("IamKing");
    // await page.getByRole("textbox", {name: 'email'}).fill("iamking@hotmail.com")
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //npx playwright test --ui - this opens a terminal
    //it has debuger mode with screenshots

    //getByPlaceholder - if your DOM structure have this attribute, you can directly identify it.
    //Now if you just pass inside this, your playwright will bring your control to this box automatically.
    await page.getByPlaceholder("Password").fill("abc123");
    // by far the best method, getByRole filters out all the buttons and clicks on that which matches
    await page.getByRole("button", {name: 'Submit'}).click();

    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();

    await page.getByRole("link", {name: 'Shop'}).click();

    //filter method will use getByText on app-card to filter out where Nokia Edge is present - we are chaining method - getByRole don't need name because it is only one button
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    //locator(css) - debate whether you should getBy methods
});
