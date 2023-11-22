const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { FavoriteType } = require('./FavoriteType')

/**
 * GraphQL Object Type for User.
 *
 * Represents a user with their username and a list of their favorites.
 * This type is used in GraphQL queries and mutations to define the structure of a user object,
 * particularly focusing on their identification and their favorite items.
 *
 * @type {GraphQLObjectType}
 *
 * @property {GraphQLString} username - The unique username of the user.
 * @property {GraphQLList<FavoriteType>} favorites - A list of the user's favorites, structured according to the `FavoriteType`.
 */
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        favorites: { type: new GraphQLList(FavoriteType) }
    })
})

module.exports = { UserType }
