const { expect } = require('@playwright/test');
const { craiglistTest } = require('../utils/craiglistPageElements')
const { CraigListPage } = require('../pageobjects/CraigListPage')
const { POManager } = require('../pageobjects/POManager');




craiglistTest(`Craigslist Ad Table Lable and Text Automation`, async ({ page, communityElements, serviceElements }) => {
    const { communityLabel, communityTables } = communityElements;
    const { serviceTables, serviceLabel } = serviceElements;
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();
    //await page.goto("https://newyork.craigslist.org/")

    const communityText = await page.getByText(communityLabel).innerText();

    console.log("Community Label Text: ", communityText);

    expect(await page.getByText(communityLabel).isVisible()).toBeTruthy();

    const communityTable = await page.locator(communityTables);
    const count = await page.locator(communityTables).count()

    for (let i = 0; i < count; i++) {
        const text = await communityTable.nth(i).textContent();
        console.log(`Community item ${i + 1}: ${text}`)
    }
    expect(await communityTable.first().isVisible()).toBeTruthy();


    const serviceText = await page.getByText(serviceLabel).innerText();
    console.log("Service Label Text: ", serviceText);
    expect(await page.getByText(serviceLabel).isVisible()).toBeTruthy();

    const serviceTable = await page.locator(serviceTables);
    const count_service = await page.locator(serviceTables).count()

    for (let i = 0; i < count_service; i++) {
        const text = await serviceTable.nth(i).textContent();
        console.log(`Community item ${i + 1}: ${text}`)
    }
    expect(await serviceTable.first().isVisible()).toBeTruthy();

}
)


craiglistTest(`Craiglist Ad Table Link Verification Automation - Community`, async ({ page, communityElements }) => {
    const { communityTables_link, communityLabel } = communityElements;
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();

    const communityLinks = await page.locator(communityTables_link);
    const count = await page.locator(communityTables_link).count();

    for (let i = 0; i < count; i++) {
        const linkText = await communityLinks.nth(i).textContent();
        console.log(`Navigate to URL: ${await linkText}`)
        await communityLinks.nth(i).click();

        //await page.waitForLoadState('networkidle');
        console.log(`Navigate to URL: ${await page.url}`)

        //Add assertion that page is not 
        expect(await page.url()).not.toBe("https://newyork.craigslist.org/");

        await page.goBack();

        await page.getByText(communityLabel).waitFor();

    }

}
)

craiglistTest(`Craiglist Ad Table Link Verification Automation - Services`, async ({ page, serviceElements }) => {
    const { serviceTables_link, serviceLabel } = serviceElements;
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();
    const serviceLinks = await page.locator(serviceTables_link);
    const count_service = await page.locator(serviceTables_link).count();

    for (let i = 0; i < count_service; i++) {
        const linkText = await serviceLinks.nth(i).textContent();
        console.log(`Navigate to URL: ${await linkText}`)
        await serviceLinks.nth(i).click();

        // await page.waitForLoadState('networkidle');
        console.log(`Navigate to URL: ${await page.url}`)

        //Add assertion that page is not 
        expect(await page.url()).not.toBe("https://newyork.craigslist.org/");

        await page.goBack();

        await page.getByText(serviceLabel).waitFor();

    }

}
)

craiglistTest(`Craiglist Page Dropdown Menu Verification`, async ({ page, craigListPageElements }) => {
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();
    const { languageDropDown, defaultDropDownValue, languageDropDownValues } = craigListPageElements
    const craigMethods = new CraigListPage(page);

    // Verify the default language
    await craigMethods.verifyDefaultLanguage(defaultDropDownValue);
    await craigMethods.selectLanguage(languageDropDownValues, languageDropDown, defaultDropDownValue);

}

)
