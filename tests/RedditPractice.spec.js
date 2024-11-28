const { expect } = require('@playwright/test');
const { redditTest } = require('../utils/redditfixtures');
const { POManager } = require('../pageobjects/POManager');

redditTest(`Reddit Test Demo`, async ({ page, redditHomeElements }) => {
    const { redditHomeLabel, redditPopularLabel } = redditHomeElements;
    const pom = new POManager(page);
    const reddit = pom.getRedditPage();
    await reddit.navigateToReddit();
    await reddit.verifyLeftNavigationLabels(redditHomeLabel, redditPopularLabel);


}

);