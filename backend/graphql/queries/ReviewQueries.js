const {
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')
const { ReviewType } = require('../types/ReviewType')
const Review = require('../../models/Review')

const getReviewsByTarget = {
    type: new GraphQLList(ReviewType),
    args: {
        targetType: { type: new GraphQLNonNull(GraphQLString) },
        targetId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
        try {
            if (args.targetType !== 'artist' && args.targetType !== 'song') {
                throw new Error(
                    'Invalid targetType. It should be "artist" or "song".'
                )
            }

            // Retrieve reviews based on targetType and targetId
            const reviews = await Review.find({
                targetType: args.targetType,
                targetId: args.targetId
            })
            return reviews
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = { getReviewsByTarget }
