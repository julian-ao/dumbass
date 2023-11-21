const { GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql')
const { UserType } = require('../types/UserType')
const User = require('../../models/User')

/**
 * GraphQL Mutation Field - addFavorite.
 *
 * Adds a favorite item (song or artist) to a user's favorite list. The mutation requires the username,
 * the type of favorite item (e.g., 'song', 'artist'), and the target ID of the item to be added.
 *
 * @type {Object} GraphQL mutation configuration object.
 * @property {UserType} type - The GraphQL type that this mutation will return.
 * @property {Object} args - Arguments required for this mutation.
 * @property {function} resolve - The resolver function to execute the mutation.
 */
const addFavorite = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        targetId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
        try {
            const user = await User.findOne({ username: args.username })
            if (!user) {
                throw new Error('User not found.')
            }
            // Check if the favorite already exists for the user
            const favoriteExist = user.favorites.some((favorite) => {
                return (
                    favorite.type === args.type &&
                    favorite.targetId === args.targetId
                )
            })
            if (favoriteExist) {
                throw new Error('Favorite already exists.')
            }
            // If the favorite doesn't exist, add it
            const favoriteObj = {
                type: args.type,
                targetId: args.targetId
            }
            user.favorites.push(favoriteObj)
            // Save the updated user
            return user.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

/**
 * GraphQL Mutation Field - removeFavorite.
 *
 * Removes a favorite item (song or artist) from a user's favorite list. The mutation requires the username,
 * the type of favorite item (e.g., 'song', 'artist'), and the target ID of the item to be removed.
 *
 * @type {Object} GraphQL mutation configuration object.
 * @property {UserType} type - The GraphQL type that this mutation will return.
 * @property {Object} args - Arguments required for this mutation.
 * @property {function} resolve - The resolver function to execute the mutation.
 */
const removeFavorite = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        targetId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
        try {
            const user = await User.findOne({ username: args.username })
            if (!user) {
                throw new Error('User not found.')
            }
            // Find the index of the favorite to remove
            const favoriteIndex = user.favorites.findIndex((favorite) => {
                return (
                    favorite.type === args.type &&
                    favorite.targetId === args.targetId
                )
            })

            if (favoriteIndex === -1) {
                throw new Error('Favorite not found.')
            }
            // Remove the favorite from the user's favorites array
            user.favorites.splice(favoriteIndex, 1)
            return await user.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = { addFavorite, removeFavorite }
