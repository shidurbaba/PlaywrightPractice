const { openBrowser, goto, write, click, closeBrowser, textBox, text, waitFor, below } = require('taiko');

(async () => {
    try {
        // Step 1: Open the browser
        await openBrowser();

        // Step 2: Navigate to the URL
        await goto("https://rahulshettyacademy.com/client");

        // Step 3: Fill in the user email and password
        await write("anshika@gmail.com", into(textBox({ placeholder: "Email address" })));
        await write("Iamking@000", into(textBox({ placeholder: "Password" })));

        // Step 4: Click the login button
        await click("Login");

        // Step 5: Wait for the card elements to appear
        await waitFor(text("Card"));

        // Step 6: Get the card titles
        const cardTitles = await text("Card", below("b")).elements();
        
        // Step 7: Log the titles
        for (let card of cardTitles) {
            console.log(await card.text());
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Step 8: Close the browser
        await closeBrowser();
    }
})();