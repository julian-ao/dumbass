const User = require('../models/User')
const Song = require('../models/Song')
const Artist = require('../models/Artist')
const Review = require('../models/Review')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


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

const FavoriteType = new GraphQLObjectType({
    name: 'Favorite',
    fields: {
        type: { type: GraphQLString },
        id: { type: GraphQLString },
    },
})


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        favorites: { type: new GraphQLList(FavoriteType) },
    })
})

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        alternate_names: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLList(GraphQLString) },
        id: { type: GraphQLInt },
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
        id: { type: GraphQLInt },
        header_image_url: { type: GraphQLString },
        release_date: { type: GraphQLString },
        primary_artist_id: { type: GraphQLString },
        title: { type: GraphQLString },
        artist_names: { type: GraphQLString },
        average_rating: { type: GraphQLFloat },
        number_of_ratings: { type: GraphQLFloat }
    })
})

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        userName: { type: GraphQLString },
        content: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        targetType: { type: GraphQLString },
        targetId: { type: GraphQLInt }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
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
                    password: hashedPassword,
                    favorites: []
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
        },
        addFavorite: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                targetId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const user = await User.findOne({ username: args.username })
                if (!user) {
                    throw new Error('User not found.')
                }
                const favoriteObj = {
                    type: args.type,
                    targetId: args.targetId
                }
                user.favorites.push(favoriteObj)
                return user.save()
            }
        },
        addReview: {
            type: ReviewType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLString },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                targetType: { type: new GraphQLNonNull(GraphQLString) },
                targetId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    if (
                        args.targetType !== 'artist' &&
                        args.targetType !== 'song'
                    ) {
                        throw new Error(
                            'Invalid targetType. It should be "artist" or "song".'
                        )
                    }

                    // Check if user exists
                    const user = await User.findOne({ username: args.userName })
                    if (!user) {
                        throw new Error('User not found.')
                    }

                    // Check if the user already has a review for this target
                    const existingReview = await Review.findOne({
                        userName: args.userName,
                        targetType: args.targetType,
                        targetId: args.targetId
                    })

                    if (existingReview) {
                        throw new Error(
                            'User already has a review for this target.'
                        )
                    }

                    // Check if rating is between 0 and 5
                    if (args.rating < 0 || args.rating > 5) {
                        throw new Error('Rating should be between 0 and 5.')
                    }

                    // Check if targetId exists
                    let target
                    if (args.targetType === 'artist') {
                        target = await Artist.findOne({ id: args.targetId })
                    } else if (args.targetType === 'song') {
                        target = await Song.findOne({ id: args.targetId })
                    }

                    if (!target) {
                        throw new Error(
                            `Target with id ${args.targetId} not found.`
                        )
                    }

                    // Create a new review object
                    const review = new Review({
                        userName: args.userName,
                        content: args.content,
                        rating: args.rating,
                        targetType: args.targetType,
                        targetId: args.targetId
                    })

                    // Save the review to the database
                    const savedReview = await review.save()

                    // Update the average rating and number of ratings for the target
                    target.average_rating =
                        (target.average_rating * target.number_of_ratings +
                            args.rating) /
                        (target.number_of_ratings + 1)
                    target.number_of_ratings += 1
                    await target.save()

                    return savedReview
                } catch (error) {
                    throw new Error(error.message)
                }
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
        },
        getReviewsByTarget: {
            type: new GraphQLList(ReviewType),
            args: {
                targetType: { type: new GraphQLNonNull(GraphQLString) },
                targetId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    console.log('getReviewsByTarget resolver args:', args)
                    if (
                        args.targetType !== 'artist' &&
                        args.targetType !== 'song'
                    ) {
                        throw new Error(
                            'Invalid targetType. It should be "artist" or "song".'
                        )
                    }

                    // Retrieve reviews based on targetType and targetId
                    const reviews = await Review.find({
                        targetType: args.targetType,
                        targetId: args.targetId
                    })

                    console.log('Retrieved reviews:', reviews)

                    return reviews
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
