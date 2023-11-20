const { GraphQLID } = require('graphql')
const { UserType } = require('../types/UserType')
const User = require('../../models/User')

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
