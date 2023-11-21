const { GraphQLObjectType } = require('graphql')
const { addUser, loginUser, deleteUser } = require('./mutations/UserMutations')
const { addFavorite, removeFavorite } = require('./mutations/FavoriteMutations')
const { addReview, deleteReview } = require('./mutations/ReviewMutations')

/**
 * GraphQL Object Type for Mutations.
 *
 * Represents the entry point for mutations in the GraphQL API. This type aggregates various mutation operations
 * related to users, favorites, and reviews. Each field in this object type corresponds to a specific mutation operation
 * defined in the respective mutation files.
 *
 * The Mutation type is essential in a GraphQL schema as it allows the API to perform actions that result in data being
 * created, updated, or deleted in the database.
 *
 * @type {GraphQLObjectType}
 *
 * @property {Function} addUser - Mutation for adding a new user. Defined in `UserMutations`.
 * @property {Function} loginUser - Mutation for logging in an existing user. Defined in `UserMutations`.
 * @property {Function} addFavorite - Mutation for adding a new favorite item. Defined in `FavoriteMutations`.
 * @property {Function} removeFavorite - Mutation for removing an existing favorite item. Defined in `FavoriteMutations`.
 * @property {Function} addReview - Mutation for adding a new review. Defined in `ReviewMutations`.
 * @property {Function} deleteReview - Mutation for deleting an existing review. Defined in `ReviewMutations`.
 */
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        loginUser,
        deleteUser,
        addFavorite,
        removeFavorite,
        addReview,
        deleteReview
    }
})

module.exports = Mutation
