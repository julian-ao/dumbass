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
