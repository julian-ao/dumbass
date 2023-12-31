const { UserType } = require('../types/UserType')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { GraphQLNonNull, GraphQLString } = require('graphql')

/**
 * GraphQL Mutation Field - addUser.
 *
 * Creates a new user with a username and password. This mutation ensures that the username is unique
 * and hashes the password before saving it to the database.
 *
 * @type {Object} GraphQL mutation configuration object.
 * @property {UserType} type - The GraphQL type that this mutation will return.
 * @property {Object} args - Arguments required for this mutation.
 * @property {function} resolve - The resolver function to execute the mutation.
 */
const addUser = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        const existingUsername = await User.findOne({
            username: args.username
        })
        if (existingUsername) {
            throw new Error('Username already taken.')
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(args.password, saltRounds)

        const user = new User({
            username: args.username,
            password: hashedPassword,
            favorites: []
        })

        return user.save()
    }
}

/**
 * GraphQL Mutation Field - loginUser.
 *
 * Validates a user's login credentials. This mutation checks if the username exists and
 * if the provided password matches the hashed password stored in the database.
 *
 * @type {Object} GraphQL mutation configuration object.
 * @property {UserType} type - The GraphQL type that this mutation will return.
 * @property {Object} args - Arguments required for this mutation.
 * @property {function} resolve - The resolver function to execute the mutation.
 */
const loginUser = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        // Check if username exists
        const user = await User.findOne({ username: args.username })
        if (!user) {
            throw new Error('User not found.')
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(
            args.password,
            user.password
        )
        if (!isPasswordValid) {
            throw new Error('Incorrect password.')
        }
        return user
    }
}

/**
 * GraphQL Mutation Field - deleteUser.
 *
 * Deletes an existing user from the database based on the provided username.
 * This mutation searches for the user by username and removes them from the database.
 * It's important to handle this operation with care, particularly in terms of access control,
 * as it involves permanently removing a user's data.
 *
 * @type {Object} GraphQL mutation configuration object.
 * @property {UserType} type - The GraphQL type that this mutation will return.
 * @property {Object} args - Arguments required for this mutation. In this case, the username.
 * @property {function} resolve - The resolver function to execute the mutation. It performs the
 *                                deletion and handles any potential errors.
 */
const deleteUser = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        try {
            const deletedUser = await User.findOneAndDelete({
                username: args.username
            })
            if (!deletedUser) {
                console.error('User not found.')
                throw new Error('User not found.')
            }
            return deletedUser
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { addUser, loginUser, deleteUser }
