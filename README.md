# Project 2 - DumBass

This project is divided into a [frontend](frontend/README.md)- and [backend](backend/README.md) directory.

## How to run the website

First make sure you are connected to the NTNU VPN.

From the root of the project, run:

1. _cd frontend_
2. _npm i_
3. _npm run dev_

## Documentation

### Dataset

Our dataset consists of artists and songs, both of which were sourced from Genius using two dedicated scripts. These scripts are located in the `/backend/scripts/` directory.

### Functionality and technologies

- HomePage contains a searchbar with built-in filtering, where you can choose between making a search on songs or artists.
- List based results of songs and artits with pagination in search page (after user have searched for a query).
- Can see more details by clicking on either a song or artist card. Song card displays lyrics and reviews, and artist card displays artist info and reviews.
- Can sort and filter on the search page to show a selection of the data.
- The users can register themselves and log in to their registered account.
- The user can add an review to either a song or artist, and also save their favourites (if they are logged in).
- We used the Genius API to fetch the songs and artists in the database, and then we use the database to store user information, favorites and reviews/ratings.
- We use Redux and sessionStorage to store information about the user ID of the logged in user to make sure the user get the correct favourites that belongs to them. The Redux' actions and reducers can be found in the 'redux' folder in the frontend.
- We use the MERN stack (MongoDB, Express.js, React, Node.js) in addition to Apollo. Our backend consists of GraphQL, MongoDB Apollo, and JavaScript, while the frontend consists of React, TypeScript, Redux, and Apollo.
- The frontend recieves the data from the backend in GraphQL format using Apollo. The code for this can be found in the `graphql`-folder in the frontend.

### Development and quality assurance

- **Pipeline** - To ensure a protected main branch which is always running, we have implemented a pipeline. This pipeline builds and tests the project before each merge request can be merged.
- **Linting** - Before creating a merge request, we have used ESLint and prettier to ensure consistent code formatting and quality.

### Tests

To ensure the robustness and reliability of the project, we have implemented numerous tests. We have tests that tests the functionality for both the frontend and backend, where we have implemented component tests, end-to-end tests, snapshot tests, and API tests.

### Accessibility

Click [here](accessibility.md) to read how we ensured universal accessibility.

### Sustainability

Click [here](sustainability.md) to read how we ensuread a sustainable project.

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

## Linting

Running ESLint to lint and automatically fix issues in the code in the current directory, and then it runs Prettier to format the code in the same directory.

This should be done before every merge request:

From root:

- 'cd frontend'

```bash
pnpx eslint . --fix && pnpx prettier --write .
```

To run lint in the backend you have to go back to the root:

- 'cd backend'

```bash
pnpx eslint . --fix
```
