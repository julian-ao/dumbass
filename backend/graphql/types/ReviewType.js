const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = require('graphql')

/**
 * GraphQL Object Type for a Review.
 * 
 * Represents a review entity with various fields including userName, content, rating, targetType, and targetId.
 * 
 * @type {GraphQLObjectType}
 * 
 * @property {GraphQLString} userName - The username of the user who wrote the review.
 * @property {GraphQLString} content - The content of the review.
 * @property {GraphQLFloat} rating - The rating given in the review. It is a float representing the score.
 * @property {GraphQLString} targetType - The type of the target entity for which the review is written (e.g., 'artist', 'song').
 * @property {GraphQLInt} targetId - The unique identifier of the target entity.
 */
const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        userName: { type: GraphQLString },
        content: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        targetType: { type: GraphQLString },
        targetId: { type: GraphQLInt }
    })
})

module.exports = { ReviewType }
