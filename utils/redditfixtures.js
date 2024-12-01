const base = require('@playwright/test')

exports.redditTest = base.test.extend(
    //Reddit - Left Menu Navigation Panel

    {
        redditHomeElements:
        {
            redditHomeLabel: "#home-posts",
            redditPopularLabel: "#popular-posts",
            LoginIn: "#login-button",
            SearchButton:'#search-input div',
            topicsArray: [
                'Internet Culture (Viral)',
                'Games',
                'Q&As',
                'Technology',
                'Pop Culture',
                'Movies & TV',
            ],
            resourcesArray: [
                'About Reddit',
                'Advertise',
                'Help',
                'Blog',
                'Careers',
                'Press',
            ]
        }
    }
)