const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const User = require('../../models/User')
const { FavoriteType } = require('../types/FavoriteType')

/**
 * GraphQL Query Field - checkIfFavorite.
 *
 * Checks if a specific item (song or artist) is marked as a favorite by a user. 
 * Returns a boolean value indicating the favorite status.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLBoolean} type - The GraphQL type that this query will return (boolean in this case).
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const checkIfFavorite = {
    type: GraphQLBoolean,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        targetId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
        try {
            const user = await User.findOne({ username: args.username })
            if (!user) {
                return false
            }
            // Check if the favorite already exists for the user
            const favoriteExist = user.favorites.some((favorite) => {
                return (
                    favorite.type === args.type &&
                    favorite.targetId === args.targetId
                )
            })
            return favoriteExist
        } catch (error) {
            throw Error(error.message)
        }
    }
}

/**
 * GraphQL Query Field - getFavorites.
 *
 * Retrieves all favorite items (songs and artists) of a user. 
 * Returns a list of `FavoriteType` objects.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(FavoriteType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const getFavorites = {
    type: new GraphQLList(FavoriteType),
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        try {
            const user = await User.findOne({ username: args.username })
            if (!user) {
                throw new Error('User not found.')
            }
            return user.favorites
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = { checkIfFavorite, getFavorites }
