const { users } = require('../sampleData.js')

const User = require('../models/User')
const Song = require('../models/Song')
const Artist = require('../models/Artist')
const Review = require('../models/Review')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require('graphql')

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add User 
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString}
            },
            resolve: async (parent, args) => {
                // Check if username already exists
                const existingUsername = await User.findOne({ username: args.username });
                if (existingUsername) {
                    throw new Error('Brukernavn allerede tatt.');
                }

                // Check if email already exists
                const existingEmail = await User.findOne({ email: args.email });
                if (existingEmail) {
                    throw new Error('E-post allerede registrert.');
                }

                let user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password
                });

                return user.save();
            }
        }
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
<<<<<<< HEAD
    query: RootQuery,
    mutation: Mutation 
=======
    query: RootQuery
>>>>>>> c795d933d584d216c8d1057e3e8e56a967e7a69b
})
