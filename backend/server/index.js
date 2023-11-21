/**
 * A server configuration file for setting up an Express server with GraphQL.
 * This script configures the server to use GraphQL and connects to a MongoDB database.
 * 
 * @module serverConfig
 */

const express = require('express')
const colors = require('colors')
const bcrypt = require('bcrypt');
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const {connectDB} = require('./config/db')
const port = process.env.PORT || 8000

const app = express()

// Connect to database
connectDB()

// Enable CORS for all routes
app.use(cors())

/**
 * Sets up a GraphQL endpoint at '/graphql'. If the server is running in development mode,
 * it enables the GraphiQL interface for testing and exploring GraphQL queries.
 */
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development'
    })
)

// Start the Express server
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = {app, server};