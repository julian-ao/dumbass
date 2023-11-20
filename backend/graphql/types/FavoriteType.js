const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const FavoriteType = new GraphQLObjectType({
    name: 'Favorite',
    fields: () => ({
        type: { type: GraphQLString },
        targetId: { type: GraphQLInt }
    })
})

module.exports = { FavoriteType }
