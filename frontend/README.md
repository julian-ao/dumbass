# Frontend

### Components

We have chosen to use an Atomic Design pattern where we divide our components into the folders `atoms`, `moleculs`, `organisms` and `pages` based on the component size. The design is a methodology for good design systems with building blocks that promote consistency and scalability.

- **Atoms** - contains the basic building block that are not useful alone. This includes Dropdown and CommonDropdown which are the dropdowns for the searchbar and filter/sort functionality. The folder also contains Button, Inputfield and RatingStars which are components reused multiple times in the application.

- **Molecules** - groups atoms together into larger functionality. Here we have ArtistSongCard, CommonSearchBar, InfoPageTabs and Reviews which all are built up by different atom components.

- **Organisms** - contains components that make up a section of the page. In this folder we have CardView that contains all the artist and song cards, and the Navbar which is displayed at every page on the website.

- **Pages** - The whole application is divided into multiple pages. Our website contains 8 different pages with different functionality as explained above.

### Pages

The website consists of 8 different frontend pages located in the `pages` folder under `components`.

- ArtistPage.tsx - Page showing information about an artist.
- SongPage.tsx - Page showing information about a song.
- ErrorPage.tsx - A not found page the users will be naviagated to if they try to access pages that don't exists.
- FavoritesPage.tsx - Page with all the favorites for the logged in user.
- HomePage.tsx - Home page with top songs and artists and a search bar.
- LoginPage.tsx - Page for login with username and password.
- Registerpage.tsx - Page for register a user with username and password.
- SearchPage.tsx - Page showing search results from the searchbar.

### Tests

To ensure a concise project structure, we have structured our  component tests in a similar way as we do with the `components` folder. By dividing the tests into the folders `atoms`, `moleculs`, `organisms` and `pages`, it makes it easier to navigate and find the corresponding tests. We have also included snapshot tests in their own snapshot folder.

To run the snapshot and component tests (make sure you are in  frontend, and that you have ran _npm install_):
- _npm test_

To ensure that the project works as a whole, we have included end-to-end tests. These tests simulate typical user behaviour to ensure that everything works as it should and to optimize the user experience.

To run the end-to-end tests (make sure you are in frontend, the frontend is running, that you have ran _npm install_, and that you are connected to the NTNU VPN):
- _npm run e2e-test_

(Disclaimer, if some of the end-to-end tests fails, try and re-run them. Due to connecting delays with the database, some of the tests needs to be ran twice :-/)