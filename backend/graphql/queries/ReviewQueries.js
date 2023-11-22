const {
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')
const { ReviewType } = require('../types/ReviewType')
const Review = require('../../models/Review')

/**
 * GraphQL Query Field - getReviewsByTarget.
 *
 * Retrieves all reviews for a specific target (either a song or an artist) identified by the target ID. 
 * Returns a list of `ReviewType` objects containing the reviews for the specified target.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(ReviewType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
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
