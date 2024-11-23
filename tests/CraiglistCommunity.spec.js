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

    await craiglist.verifyCommunitySection(communityLabel, communityTables);
    await craiglist.verifyServiceSection(serviceLabel, serviceTables);
}
)


craiglistTest(`Craiglist Ad Table Link Verification Automation - Community`, async ({ page, communityElements }) => {
    const { communityTables_link, communityLabel } = communityElements;
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();

    await craiglist.verifyCommunityLinks(communityTables_link, communityLabel);
}
)

craiglistTest(`Craiglist Ad Table Link Verification Automation - Services`, async ({ page, serviceElements }) => {
    const { serviceTables_link, serviceLabel } = serviceElements;
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();

    await craiglist.verifyServiceLinks(serviceTables_link, serviceLabel);

}
)

craiglistTest(`Craiglist Page Dropdown Menu Verification`, async ({ page, craigListPageElements }) => {
    const pom = new POManager(page);
    const craiglist = pom.getCraiglistPage();
    await craiglist.navigateTo();
    const { languageDropDown, defaultDropDownValue, languageDropDownValues } = craigListPageElements
    const craigMethods = new CraigListPage(page);

    await craigMethods.verifyDefaultLanguage(defaultDropDownValue);
    await craigMethods.selectLanguage(languageDropDownValues, languageDropDown, defaultDropDownValue);

}

)
