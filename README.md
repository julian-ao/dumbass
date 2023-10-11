# Project 1 - Sludd

## How to run the website

From the root of the project, run

1. _npm i_
2. _npm dev_

## Documentation

### Pages
The website contains 6 different pages loacted in the pages folder. Most of the functionality and components with real data is not implemented yet, but the pages shows the design with mockdata:
 - ExplorePage.tsx - Home page with top songs and artists and a search bar.
 - FavoritePage.tsx - Page with all the favorites for the logged in user.
 - SearchPage.tsx - Page showing search results from the searchbar.
 - InfoPage.tsx - Page with info and opportunity to review either a song or artist.
 - LoginPage.tsx - Page for login with username and password (can test login with username: "guest" and password: "guest")
 - Registerpage.tsx - Page for register a user with username, mail and password.
 - NotFoundPage.tsx - Page for urls that doesnt exist with button for navigating to ExplorePage.

 ### Planned functionality
 - The explore page contains a search bar with built in filtering where you can choose between searching on songs or artists only.
 - List based results of songs and artits with pagination in search page (after user have searched for a word).
 - Can see more details by clicking on either a song or artist card. Song card displays lyrics and reviews, and artist card displays info and reviews.
- Can sort and filter on search page to show a selection of the data
- We are planning to use Genius API to get the songs and artist data, and then use the database to store user information, favorites and reviews/ratings.

### Components
We have chosen to divide our components into the folder structure atoms, moleculs and views based on the components size on the website.
- Atoms - contains Dropdown and Commondropdown which are the dropdowns for the searchbar and filtering functionality. Also contains RatingStars 



## Commit message template

We used the following commit message template for all commits when contributing to the project.

`<type>`: `<title>`

Explain how the commit addresses the issue

**Co-authored-by:** `<name> <email>`

**Issue:** `#<issueNr>`

--- COMMIT END ---

The `<type>` can be one of the following:

- `feat` (new feature)
- `fix` (bug fix)
- `refactor` (refactoring production code)
- `style` (formatting, missing semicolons, etc; no code change)
- `docs` (changes to documentation)
- `test` (adding or refactoring tests; no production code change)
- `chore` (updating grunt tasks, etc; no production code change)

## Liting

Running ESLint to lint and automatically fix issues in the code in the current directory, and then it runs Prettier to format the code in the same directory.

This should be done before every commit:

```bash
pnpx eslint . --fix && pnpx prettier --write .
```
