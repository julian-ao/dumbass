const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
const { FavoriteType } = require('./FavoriteType')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        favorites: { type: new GraphQLList(FavoriteType) }
    })
})

module.exports = { UserType }
