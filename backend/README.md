# Backend

The backend is divided into several directories:
- `config`
- `graphql`
- `models`
- `scripts`
- `tests`

These directories are what makes up the key functionality of the backend.

### Config
The `config` directory contains the configuration file for the database. This is where we manage the connection to the MongoDB database.

### GraphQL
The `graphql` directory is divided into several other directories, `mutations`, `queries`, and `types`.

`Mutations` consists of the mutational queries that affects the data in the database, such as adding a review.

`Queries` consists of all the different queries that only fetches data from the database, and doesn't change any of the data. One example of this is retrieving information about a song.

`Types` consists of the structures of the GraphQL types required in our backend.

The `graphql` directory also have a schema (`schema.js`) and two query files (`Mutation.js` & `RootQuery.js`) that exports the different queries defined in `mutations` and `queries`.

### Models

`Models` defines all the models required in the MongoDB database. This includes `Artist.js`, `Review.js`, `Song.js`, and `User.js`.

### Scripts

The `Scripts` directory consists of the two scripts used to fetch data from the Genius API.