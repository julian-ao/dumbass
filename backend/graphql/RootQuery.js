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
