const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')
const { ReviewType } = require('../types/ReviewType')
const User = require('../../models/User')
const Review = require('../../models/Review')
const Artist = require('../../models/Artist')
const Song = require('../../models/Song')

const addReview = {
    type: ReviewType,
    args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
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

            // Check if user exists
            const user = await User.findOne({ username: args.userName })
            if (!user) {
                throw new Error('User not found.')
            }

            // Check if the user already has a review for this target
            const existingReview = await Review.findOne({
                userName: args.userName,
                targetType: args.targetType,
                targetId: args.targetId
            })

            if (existingReview) {
                throw new Error('User already has a review for this target.')
            }

            // Check if rating is between 0 and 5
            if (args.rating < 0 || args.rating > 5) {
                throw new Error('Rating should be between 0 and 5.')
            }

            // Check if targetId exists
            let target
            if (args.targetType === 'artist') {
                target = await Artist.findOne({ id: args.targetId })
            } else if (args.targetType === 'song') {
                target = await Song.findOne({ id: args.targetId })
            }

            if (!target) {
                throw new Error(`Target with id ${args.targetId} not found.`)
            }

            // Create a new review object
            const review = new Review({
                userName: args.userName,
                content: args.content,
                rating: args.rating,
                targetType: args.targetType,
                targetId: args.targetId
            })

            // Save the review to the database
            const savedReview = await review.save()

            // Update the average rating and number of ratings for the target
            target.average_rating =
                (target.average_rating * target.number_of_ratings +
                    args.rating) /
                (target.number_of_ratings + 1)
            target.number_of_ratings += 1
            await target.save()

            return savedReview
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

const deleteReview = {
    type: GraphQLBoolean,
    args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        targetType: { type: new GraphQLNonNull(GraphQLString) },
        targetId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parent, args) => {
        try {
            if (!['artist', 'song'].includes(args.targetType)) {
                throw new Error(
                    'Invalid targetType. It should be "artist" or "song".'
                )
            }

            const review = await Review.findOneAndDelete({
                userName: args.userName,
                targetType: args.targetType,
                targetId: args.targetId
            })

            if (!review) {
                throw new Error('Review not found.')
            }

            const target =
                args.targetType === 'artist'
                    ? await Artist.findOne({ id: args.targetId })
                    : await Song.findOne({ id: args.targetId })

            if (!target) {
                throw new Error(`Target with id ${args.targetId} not found.`)
            }

            target.average_rating =
                (target.average_rating * target.number_of_ratings -
                    review.rating) /
                Math.max(target.number_of_ratings - 1, 1)

            target.number_of_ratings = Math.max(target.number_of_ratings - 1, 0)

            await target.save()

            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = { addReview, deleteReview }
