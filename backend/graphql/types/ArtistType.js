const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
} = require('graphql')

/**
 * GraphQL Object Type - ArtistType.
 *
 * Defines the structure and data types for an artist in the GraphQL schema.
 * This type includes various fields that represent different properties of an artist.
 *
 * @type {GraphQLObjectType} A GraphQL object type for representing an artist.
 * @property {string} name - The name of the GraphQL type.
 * @property {function} fields - A function that returns an object defining the structure and data types of the artist fields.
 * @property {GraphQLList<GraphQLString>} alternate_names - A list of alternate names for the artist.
 * @property {GraphQLList<GraphQLString>} description - A list of descriptions for the artist.
 * @property {GraphQLInt} id - The unique identifier of the artist.
 * @property {GraphQLString} image_url - The URL of the artist's image.
 * @property {GraphQLString} name - The name of the artist.
 * @property {GraphQLFloat} average_rating - The average rating of the artist.
 * @property {GraphQLFloat} number_of_ratings - The number of ratings the artist has received.
 */
const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        alternate_names: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLList(GraphQLString) },
        id: { type: GraphQLInt },
        image_url: { type: GraphQLString },
        name: { type: GraphQLString },
        average_rating: { type: GraphQLFloat },
        number_of_ratings: { type: GraphQLFloat }
    })
})

module.exports = { ArtistType }
