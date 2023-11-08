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
    GraphQLInt,
    GraphQLBoolean,
    GraphQLUnionType
} = require('graphql')


const FavoriteType = new GraphQLObjectType({
    name: 'Favorite',
    fields: {
        type: { type: GraphQLString },
        targetId: { type: GraphQLInt },
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

const SearchResultType = new GraphQLUnionType({
    name: 'SearchResult',
    types: [ArtistType, SongType],
    resolveType(value) {
      if(value instanceof Artist) {
        return 'Artist';
      }
      if(value instanceof Song) {
        return 'Song';
      }
    },
});


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
                try {
                    const user = await User.findOne({ username: args.username });
                    if (!user) {
                        throw new Error('User not found.');
                    }
                    // Check if the favorite already exists for the user
                    const favoriteExist = user.favorites.some((favorite) => {
                        return (favorite.type === args.type && favorite.targetId === args.targetId);
                    });
                    if (favoriteExist) {
                        throw new Error('Favorite already exists.');
                    }
                    // If the favorite doesn't exist, add it
                    const favoriteObj = {
                        type: args.type,
                        targetId: args.targetId
                    };
                    user.favorites.push(favoriteObj);
                    // Save the updated user
                    return user.save();
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        },
        removeFavorite: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                targetId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    const user = await User.findOne({ username: args.username });
                    if (!user) {
                      throw new Error('User not found.');
                    }
                    // Find the index of the favorite to remove
                    const favoriteIndex = user.favorites.findIndex((favorite) => {
                      return (
                        favorite.type === args.type && favorite.targetId === args.targetId
                      );
                    });

                    if (favoriteIndex === -1) {
                      throw new Error('Favorite not found.');
                    }
                    // Remove the favorite from the user's favorites array
                    user.favorites.splice(favoriteIndex, 1);
                    return await user.save();
                } catch (error) {
                    throw new Error(error.message);
                }
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
        getArtistsByIds: {
            type: new GraphQLList(ArtistType),
            args: {
                ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
            },
            resolve: async (parent, args) => {
                try {
                    const artists = await Artist.find({
                        id: { $in: args.ids }
                    })
                    if (!artists) {
                        throw new Error(
                            `Artists with ids ${args.ids} not found.`
                        )
                    }
                    return artists
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
        getSongsByIds: {
            type: new GraphQLList(SongType),
            args: {
                ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
            },
            resolve: async (parent, args) => {
                try {
                    const songs = await Song.find({
                        id: { $in: args.ids }
                    })
                    if (!songs) {
                        throw new Error(`Songs with ids ${args.ids} not found.`)
                    }
                    return songs
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
                    return reviews
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
        searchSearchbar: {
            type: new GraphQLList(SearchResultType),
            args: {
              searchString: { type: new GraphQLNonNull(GraphQLString) },
              searchType: { type: new GraphQLNonNull(GraphQLString) }, // 'artist' or 'song'
              limit: { type: GraphQLInt }
            },
            resolve: async (parent, { searchString, searchType, limit }) => {
              const regex = new RegExp(searchString, 'i');
              let query = {};
              if (searchType === 'artist') {
                query = { name: regex };
              } else if (searchType === 'song') {
                query = { title: regex };
              }

              if (typeof limit === 'number' && limit > 0) {
                return searchType === 'artist'
                  ? Artist.find(query).limit(limit)
                  : Song.find(query).limit(limit);
              }
              return searchType === 'artist'
                ? Artist.find(query)
                : Song.find(query);
            }
        },
        searchSearchbar: {
            type: new GraphQLList(SearchResultType),
            args: {
              searchString: { type: new GraphQLNonNull(GraphQLString) },
              searchType: { type: new GraphQLNonNull(GraphQLString) }, // 'artist' or 'song'
              limit: { type: GraphQLInt }
            },
            resolve: async (parent, { searchString, searchType, limit }) => {
              const regex = new RegExp(searchString, 'i');
              let query = {};

              if (searchType === 'artist') {
                query = { name: regex };
              } else if (searchType === 'song') {
                query = { title: regex };
              }

              if (typeof limit === 'number' && limit > 0) {
                return searchType === 'artist'
                  ? Artist.find(query).limit(limit)
                  : Song.find(query).limit(limit);
              }

              return searchType === 'artist'
                ? Artist.find(query)
                : Song.find(query);
            }
        },
        getSongsOnTitle: {
            type: new GraphQLList(SongType),
            args: {
                limit: { type: GraphQLInt },
                title: { type: GraphQLString },
                sort: { type: GraphQLString },
                page: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                let query = {};
                const skip = (args.page - 1) * args.limit;


                if (args.title) {
                    query.title = new RegExp(args.title, 'i');

                    if (args.sort.toLowerCase() === 'rating') {
                        try {
                            return Song.find(query).sort({ average_rating: -1 }).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No songs found. " + error);
                        }
                    }
                    else if (args.sort.toLowerCase() === 'alphabetical') {
                        try {
                            return Song.find(query).sort({ title: 1 }).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No songs found. " + error);
                        }
                    } else if (args.sort.toLowerCase() === 'relevance') {
                        try {
                            return Song.find(query).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No songs found. " + error);
                        }
                    }
                } else {
                    throw new Error('No title provided');
                }
            }
        },
        getArtistsOnName: {
            type: new GraphQLList(ArtistType),
            args: {
                limit: { type: GraphQLInt },
                name: { type: GraphQLString },
                sort: { type: GraphQLString },
                page: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                let query = {};
                const skip = (args.page - 1) * args.limit;

                if (args.name) {
                    query.name = new RegExp(args.name, 'i');

                    if (args.sort.toLowerCase() === 'rating') {
                        try {
                            return Artist.find(query).sort({ average_rating: -1 }).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No artists found. " + error);
                        }
                    }
                    else if (args.sort.toLowerCase() === 'alphabetical') {
                        try {
                            return Artist.find(query).sort({ title: 1 }).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No artists found. " + error);
                        }
                    } else if (args.sort.toLowerCase() === 'relevance') {
                        try {
                            return Artist.find(query).skip(skip).limit(args.limit);
                        } catch (error) {
                            throw new Error("No artists found. " + error);
                        }
                    }
                } else {
                    throw new Error('No name provided');
                }

            }
        },
        countSongs: {
            type: GraphQLInt,
            args: {
                title: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                let query = {};
                if (args.title) {
                    query.title = new RegExp(args.title, 'i');
                }
                try {
                    return await Song.countDocuments(query);
                } catch (error) {
                    throw new Error("Error counting songs. " + error);
                }
            }
        },
        countArtists: {
            type: GraphQLInt,
            args: {
                name: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                let query = {};
                if (args.name) {
                    query.name = new RegExp(args.name, 'i');
                }
                try {
                    return await Artist.countDocuments(query);
                } catch (error) {
                    throw new Error("Error counting artists. " + error);
                }
            }
        },
        checkIfFavorite: {
            type: GraphQLBoolean,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                targetId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    const user = await User.findOne({ username: args.username });
                    if (!user) {
                        return false;
                    }
                    // Check if the favorite already exists for the user
                    const favoriteExist = user.favorites.some((favorite) => {
                        return (favorite.type === args.type && favorite.targetId === args.targetId);
                    });
                    return favoriteExist;
                } catch (error) {
                    throw Error(error.message);
                }
            }
        },
        getFavorites: {
            type: new GraphQLList(FavoriteType),
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {
                try {
                    const user = await User.findOne({ username: args.username });
                    if (!user) {
                        throw new Error('User not found.');
                    }
                    return user.favorites;
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
