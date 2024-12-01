const { expect } = require('@playwright/test');
const { redditTest } = require('../utils/redditfixtures');
const { POManager } = require('../pageobjects/POManager');

redditTest(`Reddit Test Demo`, async ({ page, redditHomeElements }) => {
    const { redditHomeLabel, redditPopularLabel } = redditHomeElements;
    const pom = new POManager(page);
    const reddit = pom.getRedditPage();
    await reddit.navigateToReddit();
    await reddit.verifyLeftNavigationLabels(redditHomeLabel, redditPopularLabel);


});


redditTest(`Reddit Test Demo 2`, async ({ page, redditHomeElements }) => {
    //verify that I am able to click on left two navigation panels
    const { redditHomeLabel, redditPopularLabel, SearchButton } = redditHomeElements;
    const pom = new POManager(page);
    const reddit = pom.getRedditPage();
    await reddit.navigateToReddit();

    await reddit.verifyLeftNavigationHomeLabel(redditHomeLabel);
    await reddit.verifyLeftNavigationPopularLabel(redditPopularLabel);
    await page.waitForTimeout(2000); // Static wait (e.g., 2 seconds)
    await reddit.verifySearchTextInput("Elon Musk");
    await reddit.verifyClickSearchBar(SearchButton);

});

redditTest(`Reddit Test Demo 3`, async ({ page }) => {
    const pom = new POManager(page);
    const reddit = pom.getRedditPage();
    await reddit.navigateToReddit();

    await reddit.verifySearchAndNavigation("Elon Musk");

});

redditTest(`Reddit Test Demo 4`, async ({ page }) => {
    const pom = new POManager(page);
    const reddit = pom.getRedditPage();
    await reddit.navigateToReddit();
    await reddit.verifyLeftNavigationPanelDemo4();
});
