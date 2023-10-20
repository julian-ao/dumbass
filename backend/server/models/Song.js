const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    annotation_count: {
        type: Number,
        required: true
    },
    api_path: {
        type: String,
        required: true
    },
    apple_music_id: String,
    apple_music_player_url: String,
    artist_names: {
        type: String,
        required: true
    },
    embed_content: String,
    featured_video: Boolean,
    full_title: {
        type: String,
        required: true
    },
    header_image_thumbnail_url: String,
    header_image_url: String,
    id: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    release_date: String,
    title: {
        type: String,
        required: true
    },
    title_with_featured: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    primary_artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
})

module.exports = mongoose.model('Song', SongSchema)
