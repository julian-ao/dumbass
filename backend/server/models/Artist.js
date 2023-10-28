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
