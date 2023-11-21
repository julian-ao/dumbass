const { SongType } = require('../types/SongType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')
const Song = require('../../models/Song')

/**
 * GraphQL Query Field - getSongById.
 *
 * Retrieves a song based on the provided ID.
 * Returns a SongType object.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {SongType} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const getSongById = {
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

/**
 * GraphQL Query Field - getSongsByIds.
 *
 * Retrieves a list of songs based on the provided IDs.
 * Returns a list of SongType objects.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(SongType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const getSongsByIds = {
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
}

/**
 * GraphQL Query Field - countSongs.
 *
 * Counts the number of songs that match the provided title query.
 * Returns an integer representing the count.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLInt} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const countSongs = {
    type: GraphQLInt,
    args: {
        title: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        let query = {}
        if (args.title) {
            query.title = new RegExp(args.title, 'i')
        }
        try {
            return await Song.countDocuments(query)
        } catch (error) {
            throw new Error('Error counting songs. ' + error)
        }
    }
}

module.exports = { getSongById, getSongsByIds, countSongs }
