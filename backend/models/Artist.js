/**
 * MongoDB Schema for Artist.
 *
 * This file defines the schema for the Artist model using Mongoose. The Artist schema represents
 * the structure of artist data in the MongoDB database. Each artist has various fields including
 * alternate names, description, an ID, image URL, name, average rating, and the number of ratings.
 *
 * @module ArtistSchema
 * 
 * @property {Array<String>} alternate_names - An array of alternate names for the artist.
 * @property {Array<String>} description - A list of strings providing descriptions about the artist.
 * @property {Number} id - A unique identifier for the artist.
 * @property {String} image_url - The URL for the artist's image.
 * @property {String} name - The name of the artist.
 * @property {Number} average_rating - The average rating for the artist, calculated from user ratings.
 * @property {Number} number_of_ratings - The total number of ratings received by the artist.
 */

const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    alternate_names: {
        type: [String],
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    average_rating: {
        type: Number,
        required: true
    },
    number_of_ratings: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Artist', ArtistSchema)
