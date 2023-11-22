const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

/**
 * GraphQL Object Type - FavoriteType.
 *
 * Defines the structure and data types for a favorite item in the GraphQL schema.
 * This type includes fields representing the type of the favorite item (such as 'artist' or 'song')
 * and its unique identifier.
 *
 * @type {GraphQLObjectType} A GraphQL object type for representing a favorite item.
 * @property {string} name - The name of the GraphQL type.
 * @property {function} fields - A function that returns an object defining the structure and data types of the favorite fields.
 * @property {GraphQLString} type - The type of the favorite item, indicating what kind of entity is being favorited.
 * @property {GraphQLInt} targetId - The unique identifier of the favorited entity.
 */
const FavoriteType = new GraphQLObjectType({
    name: 'Favorite',
    fields: () => ({
        type: { type: GraphQLString },
        targetId: { type: GraphQLInt }
    })
})

module.exports = { FavoriteType }
