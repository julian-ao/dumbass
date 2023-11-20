const { GraphQLObjectType } = require('graphql')
const { addUser, loginUser } = require('./mutations/UserMutations')
const { addFavorite, removeFavorite } = require('./mutations/FavoriteMutations')
const { addReview, deleteReview } = require('./mutations/ReviewMutations')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        loginUser,
        addFavorite,
        removeFavorite,
        addReview,
        deleteReview
    }
})

module.exports = Mutation
