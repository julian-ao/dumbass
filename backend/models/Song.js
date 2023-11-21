/**
 * MongoDB Schema for Song.
 *
 * This file defines the schema for the Song model using Mongoose. The Song schema represents
 * the structure of song data in the MongoDB database. It includes properties like artist names, 
 * description, header image URL, song ID, release date, title, primary artist ID, average rating, 
 * number of ratings, and lyrics.
 *
 * @module SongSchema
 * 
 * @property {String} artist_names - Names of the artists for the song.
 * @property {String[]} description - An array of strings representing the description of the song.
 * @property {String} header_image_url - URL for the song's header image.
 * @property {Number} id - The unique identifier for the song.
 * @property {String} release_date - The release date of the song.
 * @property {String} title - The title of the song.
 * @property {Number} primary_artist_id - The unique identifier of the primary artist of the song.
 * @property {Number} average_rating - The average rating of the song.
 * @property {Number} number_of_ratings - The number of ratings the song has received.
 * @property {String} lyrics - The lyrics of the song.
 */

const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    artist_names: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    header_image_url: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    primary_artist_id: {
        type: Number,
        required: true
    },
    average_rating: {
        type: Number,
        required: true
    },
    number_of_ratings: {
        type: Number,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Song', SongSchema)
