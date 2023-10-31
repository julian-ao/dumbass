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
    GraphQLFloat
} = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString }
    })
})

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        alternate_names: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLList(GraphQLString) },
        id: { type: GraphQLString },
        image_url: { type: GraphQLString },
        name: { type: GraphQLString },
        average_rating: { type: GraphQLFloat },
        number_of_ratings: { type: GraphQLFloat }
    })
})

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        lyrics: { type: GraphQLString },
        id: { type: GraphQLString },
        header_image_url: { type: GraphQLString },
        release_date: { type: GraphQLString },
        title: { type: GraphQLString },
        artist_names: { type: GraphQLString },
        average_rating: { type: GraphQLFloat },
        number_of_ratings: { type: GraphQLFloat }
    })
})

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
        getArtistById: {
            type: ArtistType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                try {
                    const artist = await Artist.findOne({ id: Number(args.id) })
                    if (!artist) {
                        throw new Error(`Artist with id ${args.id} not found.`)
                    }
                    return artist
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
        getSongById: {
            type: SongType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                try {
                    const song = await Song.findOne({ id: Number(args.id) })
                    if (!song) {
                        throw new Error(`Song with id ${args.id} not found.`)
                    }
                    return song
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
