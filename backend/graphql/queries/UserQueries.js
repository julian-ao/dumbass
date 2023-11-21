const { GraphQLID } = require('graphql')
const { UserType } = require('../types/UserType')
const User = require('../../models/User')

/**
 * GraphQL Query Field - getUser.
 *
 * Retrieves a user based on the provided ID.
 * Returns a UserType object which represents a user.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {UserType} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {GraphQLID} args.id - The ID of the user to retrieve.
 * @property {function} resolve - The resolver function to execute the query.
 *                               This function fetches and returns the user
 *                               data from the database based on the provided ID.
 */
const getUser = {
    type: UserType,
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

module.exports = { getUser }
