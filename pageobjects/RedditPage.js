const { expect, page } = require("@playwright/test")
class RedditPage {
    constructor(page) {
        this.page = page;
    }


    async navigateToReddit() {
        await this.page.goto("https://www.reddit.com/");
    }


    async verifyLeftNavigationLabels(redditHomeLabel, redditPopularLabel) {
        try {

            const homeLabel = this.page.locator(`${redditHomeLabel} span.text-14`);
            const popularLabel = this.page.locator(`${redditPopularLabel} span.text-14`);

            const homeText = await homeLabel.textContent();
            const popularText = await popularLabel.textContent();

            expect(homeText.trim()).toBe('Home');
            console.log(`Verified text: "${homeText.trim()}"`);

            expect(popularText.trim()).toBe('Popular');
            console.log(`Verified text: "${popularText.trim()}"`);
        } catch (error) {
            console.error(`❌ Error verifying labels: ${error.message}`);
            throw error;
        }

    }

    async verifyLeftNavigationHomeLabel(redditHomeLabel) {
        await this.page.click(redditHomeLabel);
        console.log("Clicked on Home Left Nav Label");
    }

    async verifyLeftNavigationPopularLabel(redditPopularLabel) {
        await this.page.click(redditPopularLabel);
        console.log("Clicked on Popular Left Nav Label");
    }

    async verifySearchTextInput(enterText) {
        await this.page.getByRole("textbox").fill(enterText);
        console.log(`${enterText} was entered!`);

    }
    async verifyClickSearchBar(SearchButton) {
        await this.page.click(SearchButton);
        console.log("Click on search button");
    }

    async verifySearchAndNavigation(enterText) {
        try {
            await this.page.waitForTimeout(1000);
            await this.verifySearchTextInput(enterText);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(500);
            await this.page.getByRole('button', { name: 'Posts' }).click();
            console.log("Clicked on 'Posts' tab");
            await this.page.waitForTimeout(500);
            await this.page.locator('#search-results-page-tab-communities').click();
            console.log("Clicked on 'Communities' tab");
            await this.page.waitForTimeout(500);
            await this.page.getByRole('link', { name: 'Comments' }).click();
            console.log("Clicked on 'Comments' tab");
            await this.page.waitForTimeout(500);
            await this.page.getByRole('link', { name: 'Media' }).click();
            console.log("Clicked on 'Media' tab");
            await this.page.waitForTimeout(500);
            await this.page.getByRole('link', { name: 'People', exact: true }).click();
            console.log("Clicked on 'People' tab");
        } catch (error) {
            console.error(`Something seriously messed up: ${error.message}`);
            throw error
        }
    }


}
module.exports = { RedditPage }
