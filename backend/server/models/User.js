/**
 * MongoDB Schema for User.
 *
 * This file defines the schema for the User model using Mongoose. The User schema represents
 * the structure of user data in the MongoDB database. It includes properties like username, 
 * password, and a list of favorites which can be either songs or artists.
 *
 * @module UserSchema
 * 
 * @property {String} username - The unique username of the user.
 * @property {String} password - The password for the user's account.
 * @property {Object[]} favorites - An array of objects representing the user's favorite songs or artists.
 * @property {String} favorites.type - The type of the favorite item, either 'song' or 'artist'.
 * @property {Number} favorites.targetId - The unique identifier of the favorite song or artist.
 */

const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [
      {
          type: {
              type: String,
              enum: ['song', 'artist'],
              required: true,
          },
          targetId: {
              type: Number,
              required: true,
          },
      }
  ],
})

module.exports = mongoose.model('User', UserSchema)
