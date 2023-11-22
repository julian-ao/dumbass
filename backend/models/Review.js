/**
 * MongoDB Schema for Review.
 *
 * This file defines the schema for the Review model using Mongoose. The Review schema represents
 * the structure of review data in the MongoDB database. Each review includes the user's name,
 * review content, rating, target type (song or artist), and a target ID.
 *
 * @module ReviewSchema
 *
 * @property {String} userName - The name of the user who wrote the review.
 * @property {String} content - The content of the review. This field is optional.
 * @property {Number} rating - The rating given by the user, on a scale (typically from 1 to 5).
 * @property {String} targetType - The type of target for the review, either 'song' or 'artist'.
 * @property {Number} targetId - A unique identifier for the target (song or artist) of the review.
 */

const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
    targetType: {
        type: String,
        enum: ['song', 'artist'],
        required: true
    },
    targetId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema)
