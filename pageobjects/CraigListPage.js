const {expect} = require("@playwright/test")
class CraigListPage 
{
constructor(page)
{
    this.page = page;
}


 // Method to verify the default language
 async verifyDefaultLanguage(defaultDropDownValue) 
 {
    const defaultValue = await this.page.locator(defaultDropDownValue).textContent();
    console.log(`Default language: ${defaultValue.trim()}`);
    await expect(defaultValue.trim()).toBe('english');
}

// Method to select a language from the dropdown
async selectLanguage(languageDropDownValues, languageDropDown,defaultDropDownValue) {
    for(const language of languageDropDownValues)
        {
            console.log(`Selecting Language: ${language}`)
            await this.page.locator(languageDropDown).selectOption({label: language})
            await this.page.waitForLoadState('networkidle');

            const selectedLanguage = await this.page.locator(defaultDropDownValue).textContent();
            console.log(`Selected language after change: ${selectedLanguage}`)
        }
}
}

module.exports = {CraigListPage}
