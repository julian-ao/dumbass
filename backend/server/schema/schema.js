const User = require('../models/User')
const Song = require('../models/Song')
const Artist = require('../models/Artist')
const Review = require('../models/Review')
const bcrypt = require('bcrypt')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt
} = require('graphql')

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      alternate_names: { type: new GraphQLList(GraphQLString) },
      description: { type: new GraphQLList(GraphQLString) },
      image_url: { type: GraphQLString },
      average_rating: { type: GraphQLFloat },
      number_of_ratings: { type: GraphQLFloat },
    }),
  });

  const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      artist_names: { type: GraphQLString },
      description: { type: new GraphQLList(GraphQLString) },
      header_image_url: { type: GraphQLString },
      release_date: { type: GraphQLString },
      primary_artist_id: { type: GraphQLFloat },
      average_rating: { type: GraphQLFloat },
      number_of_ratings: { type: GraphQLFloat },
      lyrics: { type: GraphQLString },
    }),
  });

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                // Check if username already exists
                const existingUsername = await User.findOne({
                    username: args.username
                })
                if (existingUsername) {
                    throw new Error('Username already taken.')
                }
                const saltRounds = 10
                const hashedPassword = await bcrypt.hash(
                    args.password,
                    saltRounds
                )

                const user = new User({
                    username: args.username,
                    password: hashedPassword
                })

                return user.save()
            }
        },
        loginUser: {
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
    }
})

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
        },
        getTopArtists: {
            type: new GraphQLList(ArtistType),
            args: {
                limit: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return Artist.find().sort({ average_rating: -1 }).skip(0).limit(args.limit);
            }
        },
        getTopSongs: {
            type: new GraphQLList(SongType),
            args: {
                limit: { type: GraphQLInt } // Add the 'limit' argument
            },
            resolve(parent, args) {
                return Song.find().sort({ average_rating: -1 }).skip(0).limit(args.limit);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
