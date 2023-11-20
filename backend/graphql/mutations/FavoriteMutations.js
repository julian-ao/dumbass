const { GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql')
const { UserType } = require('../types/UserType')
const User = require('../../models/User')

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
