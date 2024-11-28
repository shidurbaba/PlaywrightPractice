const { expect, page } = require("@playwright/test")
class RedditPage {
    constructor(page) {
        this.page = page;
    }


    async navigateToReddit(){
        await this.page.goto("https://www.reddit.com/");
    }


    async verifyLeftNavigationLabels(redditHomeLabel, redditPopularLabel) {
        try {
            // Locate elements using provided selectors
            const homeLabel = this.page.locator(`${redditHomeLabel} span.text-14`);
            const popularLabel = this.page.locator(`${redditPopularLabel} span.text-14`);
    
            // Get text content
            const homeText = await homeLabel.textContent();
            const popularText = await popularLabel.textContent();
    
            // Trim and verify text
            expect(homeText.trim()).toBe('Home');
            console.log(`Verified text: "${homeText.trim()}"`);
    
            expect(popularText.trim()).toBe('Popular');
            console.log(`Verified text: "${popularText.trim()}"`);
        } catch (error) {
            console.error(`❌ Error verifying labels: ${error.message}`);
            throw error;
        }

    }


}
module.exports = { RedditPage }
