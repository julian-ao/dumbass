/**
 * MongoDB connection utility.
 *
 * This module provides functions to connect to and disconnect from a MongoDB database.
 * It utilizes Mongoose for database operations. The connection URI is read from the environment variables.
 */

const mongoose = require('mongoose')

/**
 * Connects to the MongoDB database.
 *
 * This asynchronous function establishes a connection to the MongoDB database using Mongoose.
 * The MongoDB URI is obtained from the environment variables. It logs the connection host upon successful connection.
 */
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

/**
 * Closes the MongoDB database connection.
 *
 * This asynchronous function disconnects the application from the MongoDB database using Mongoose.
 */
const closeDatabaseConnection = async () => {
    await mongoose.disconnect()
}

module.exports = { connectDB, closeDatabaseConnection }
