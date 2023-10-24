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
