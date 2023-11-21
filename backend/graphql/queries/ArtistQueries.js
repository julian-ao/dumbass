const { ArtistType } = require('../types/ArtistType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')
const Artist = require('../../models/Artist')

const getArtistById = {
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
}

const getArtistsByIds = {
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
                throw new Error(`Artists with ids ${args.ids} not found.`)
            }
            return artists
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
const countArtists = {
    type: GraphQLInt,
    args: {
        name: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        let query = {}
        if (args.name) {
            query.name = new RegExp(args.name, 'i')
        }
        try {
            return await Artist.countDocuments(query)
        } catch (error) {
            throw new Error('Error counting artists. ' + error)
        }
    }
}

module.exports = { getArtistById, getArtistsByIds, countArtists }
