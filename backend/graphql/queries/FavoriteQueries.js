const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const User = require('../../models/User')
const { FavoriteType } = require('../types/FavoriteType')

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
