const { UserType } = require('../types/UserType')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { GraphQLNonNull, GraphQLString } = require('graphql')

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

module.exports = { addUser, loginUser }
