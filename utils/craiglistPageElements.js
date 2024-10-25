const base = require('@playwright/test');

exports.craiglistTest = base.test.extend(
    //Craiglist - Community Listing
    {
        craigListPageElements:
        {
            languageDropDown: "#chlang",
            defaultDropDownValue: "#chlang option[selected]",
            languageDropDownValues: ["dansk", "deutsch", "español", "français", "italiano", "português", "suomi", "svenska"]
        },

        communityElements:
        {
            communityTables: ".community #ccc ul li",
            communityLabel: "community",
            communityTables_link: ".community #ccc ul li a"
        },

        serviceElements:
        {
            serviceTables: ".community #bbb ul li",
            serviceLabel: "services",
            serviceTables_link: ".community #bbb ul li a",

        },

        discussionForumElements:
        {
            discussionTables: ".community #forums ul li",
            discussionLabel: "discussion forums"
        },

        //Resusable methods for CraigslistTest

    }




)