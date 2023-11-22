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

### Test

In the backend, we have implemented API tests, where we test the response of the database based on the queries. We make sure the database returns correct data when it is supposed to, and that it returns appropriate error messages on incorrect queries. We used a mock-technique to implement this.

To run the tests (make sure you are in backend, and that you have ran _npm install_):
- _npm test_ 