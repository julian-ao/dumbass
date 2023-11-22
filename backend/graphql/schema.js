const { GraphQLSchema } = require('graphql')
const RootQuery = require('./RootQuery')
const Mutation = require('./Mutation')

/**
 * Main GraphQL Schema Definition.
 *
 * This file defines the GraphQL schema by specifying the root query and mutation types.
 * It uses the GraphQLSchema constructor from the 'graphql' package to create a new schema.
 * The RootQuery and Mutation types, imported from their respective files, are set as the
 * query and mutation entry points for the GraphQL API.
 *
 * This schema serves as the structure for your GraphQL server, outlining how queries and mutations
 * are handled and how data is structured and accessed. The RootQuery type defines all the possible
 * read operations, while the Mutation type defines all the possible write operations in the GraphQL API.
 *
 * @module GraphQLSchema
 *
 * @property {Object} RootQuery - The root query object that contains all query definitions.
 *                                Defined in 'RootQuery.js'.
 * @property {Object} Mutation - The mutation object that contains all mutation definitions.
 *                               Defined in 'Mutation.js'.
 */
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
