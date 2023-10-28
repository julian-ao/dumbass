const User = require('../models/User')
const Song = require('../models/Song')
const Artist = require('../models/Artist')
const Review = require('../models/Review')
const bcrypt = require('bcrypt');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
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
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                // Check if username already exists
                const existingUsername = await User.findOne({ username: args.username });
                if (existingUsername) {
                    throw new Error('Username already taken.');
                }

                // Check if email already exists
                const existingEmail = await User.findOne({ email: args.email });
                if (existingEmail) {
                    throw new Error('E-mail already registered.');
                }
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(args.password, saltRounds);

                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword
                });

                return user.save();
            }
        },
        loginUser : {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                // Check if username exists
                const user = await User.findOne({ username: args.username });
                if (!user) {
                  throw new Error('User not found.');
                }
                // Check if password is correct
                const isPasswordValid = await bcrypt.compare(args.password, user.password);
                if (!isPasswordValid) {
                  throw new Error('Incorrect password.');
                }
                return user;
              },
        },
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUser: {
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
    query: RootQuery,
    mutation: Mutation
})
