const { GraphQLObjectType } = require('graphql')
const { getUser } = require('./queries/UserQueries')
const {
    getSongById,
    getSongsByIds,
    countSongs
} = require('./queries/SongQueries')
const {
    getArtistById,
    getArtistsByIds,
    countArtists
} = require('./queries/ArtistQueries')
const { checkIfFavorite, getFavorites } = require('./queries/FavoriteQueries')
const { getReviewsByTarget } = require('./queries/ReviewQueries')
const {
    searchSearchbar,
    getSongsOnTitle,
    getArtistsOnName
} = require('./queries/SearchQueries')

/**
 * GraphQL Object Type for Root Queries.
 * 
 * Represents the entry point for queries in the GraphQL API. This type consolidates various query operations
 * related to users, songs, artists, favorites, reviews, and search functionalities. Each field in this object
 * type is linked to a specific query operation defined in their respective query files.
 * 
 * The RootQuery type is crucial in a GraphQL schema as it enables the API to fetch and retrieve data from the
 * database based on different criteria and requirements.
 * 
 * @type {GraphQLObjectType}
 * 
 * @property {Function} getUser - Query to retrieve a single user. Defined in `UserQueries`.
 * @property {Function} getSongById - Query to retrieve a single song by ID. Defined in `SongQueries`.
 * @property {Function} getSongsByIds - Query to retrieve multiple songs by their IDs. Defined in `SongQueries`.
 * @property {Function} countSongs - Query to count songs based on criteria. Defined in `SongQueries`.
 * @property {Function} getArtistById - Query to retrieve a single artist by ID. Defined in `ArtistQueries`.
 * @property {Function} getArtistsByIds - Query to retrieve multiple artists by their IDs. Defined in `ArtistQueries`.
 * @property {Function} countArtists - Query to count artists based on criteria. Defined in `ArtistQueries`.
 * @property {Function} checkIfFavorite - Query to check if an item is a favorite. Defined in `FavoriteQueries`.
 * @property {Function} getFavorites - Query to retrieve favorite items of a user. Defined in `FavoriteQueries`.
 * @property {Function} getReviewsByTarget - Query to retrieve reviews for a specific target. Defined in `ReviewQueries`.
 * @property {Function} searchSearchbar - Query for searching items via a search bar. Defined in `SearchQueries`.
 * @property {Function} getSongsOnTitle - Query to retrieve songs based on title. Defined in `SearchQueries`.
 * @property {Function} getArtistsOnName - Query to retrieve artists based on name. Defined in `SearchQueries`.
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUser,
        getSongById,
        getSongsByIds,
        countSongs,
        getArtistById,
        getArtistsByIds,
        countArtists,
        checkIfFavorite,
        getFavorites,
        getReviewsByTarget,
        searchSearchbar,
        getSongsOnTitle,
        getArtistsOnName
    }
})

module.exports = RootQuery
