const { expect, page } = require("@playwright/test")
class CraigListPage {
    constructor(page) {
        this.page = page;
    }



    // Method to verify the default language
    async verifyDefaultLanguage(defaultDropDownValue) {
        const defaultValue = await this.page.locator(defaultDropDownValue).textContent();
        console.log(`Default language: ${defaultValue.trim()}`);
        await expect(defaultValue.trim()).toBe('english');
    }

    // Method to select a language from the dropdown
    async selectLanguage(languageDropDownValues, languageDropDown, defaultDropDownValue) {
        for (const language of languageDropDownValues) {
            console.log(`Selecting Language: ${language}`)
            await this.page.locator(languageDropDown).selectOption({ label: language })
            await this.page.waitForLoadState('networkidle');

            const selectedLanguage = await this.page.locator(defaultDropDownValue).textContent();
            console.log(`Selected language after change: ${selectedLanguage}`)
        }
    }

    async navigateTo() {
        await this.page.goto("https://newyork.craigslist.org/");
    }

    async verifyServiceLinks(serviceTablesLink, serviceLabel) {
        const serviceLinks = await this.page.locator(serviceTablesLink);
        const count_service = await serviceLinks.count();

        for (let i = 0; i < count_service; i++) {
            const linkText = await serviceLinks.nth(i).textContent();
            console.log(`Navigate to URL: ${linkText}`);
            await serviceLinks.nth(i).click();

            // Add assertion that page URL is not the default Craigslist homepage
            expect(await this.page.url()).not.toBe("https://newyork.craigslist.org/");

            console.log(`Navigate to URL: ${await this.page.url()}`);

            // Go back to the previous page
            await this.page.goBack();

            // Ensure the page has returned to the service section by checking for the service label
            await this.page.locator(`text=${serviceLabel}`).waitFor();
        }
    }

    // New method for verifying community links
    async verifyCommunityLinks(communityTablesLink, communityLabel) {
        const communityLinks = await this.page.locator(communityTablesLink);
        const count = await communityLinks.count();

        for (let i = 0; i < count; i++) {
            const linkText = await communityLinks.nth(i).textContent();
            console.log(`Navigate to URL: ${linkText}`);
            await communityLinks.nth(i).click();

            // Add assertion that the page URL is not the Craigslist homepage
            expect(await this.page.url()).not.toBe("https://newyork.craigslist.org/");

            console.log(`Navigate to URL: ${await this.page.url()}`);

            // Go back to the previous page
            await this.page.goBack();

            // Ensure the page returns to the community section by checking for the community label
            await this.page.locator(`text=${communityLabel}`).waitFor();
        }
    }

    async verifyCommunitySection(communityLabel, communityTables) {
        // Verify the community label text
        const communityText = await this.page.getByText(communityLabel).innerText();
        console.log("Community Label Text: ", communityText);
        expect(await this.page.getByText(communityLabel).isVisible()).toBeTruthy();

        // Verify the community table content
        const communityTable = await this.page.locator(communityTables);
        const count = await communityTable.count();

        // Loop through the community table and log item text
        for (let i = 0; i < count; i++) {
            const text = await communityTable.nth(i).textContent();
            console.log(`Community item ${i + 1}: ${text}`);
        }

        // Assert that the first community table item is visible
        expect(await communityTable.first().isVisible()).toBeTruthy();
    }
 
    async verifyServiceSection(serviceLabel, serviceTables) {
        // Verify the service label text
        const serviceText = await this.page.getByText(serviceLabel).innerText();
        console.log("Service Label Text: ", serviceText);
        expect(await this.page.getByText(serviceLabel).isVisible()).toBeTruthy();

        // Verify the service table content
        const serviceTable = await this.page.locator(serviceTables);
        const count_service = await serviceTable.count();

        // Loop through the service table and log item text
        for (let i = 0; i < count_service; i++) {
            const text = await serviceTable.nth(i).textContent();
            console.log(`Service item ${i + 1}: ${text}`);
        }

        // Assert that the first service table item is visible
        expect(await serviceTable.first().isVisible()).toBeTruthy();
    }
}

module.exports = { CraigListPage }
