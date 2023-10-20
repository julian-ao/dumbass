const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    alternate_names: {
        type: [String]
    },
    api_path: String,
    facebook_name: String,
    followers_count: Number,
    header_image_url: String,
    id: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    instagram_name: String,
    is_meme_verified: Boolean,
    is_verified: Boolean,
    name: {
        type: String,
        required: true
    },
    translation_artist: Boolean,
    twitter_name: String,
    url: String,
    iq: Number
});

module.exports = mongoose.model('Artist', ArtistSchema);
