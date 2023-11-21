const { SongType } = require('../types/SongType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')
const Song = require('../../models/Song')

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
