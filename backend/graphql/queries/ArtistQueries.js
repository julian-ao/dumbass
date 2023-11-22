const { ArtistType } = require('../types/ArtistType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')
const Artist = require('../../models/Artist')

/**
 * GraphQL Query Field - getArtistById.
 *
 * Retrieves a single artist by their unique ID. Returns an `ArtistType` object corresponding to the provided ID.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {ArtistType} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
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

/**
 * GraphQL Query Field - getArtistsByIds.
 *
 * Retrieves multiple artists based on an array of their IDs. Returns a list of `ArtistType` objects.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(ArtistType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
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

/**
 * GraphQL Query Field - countArtists.
 *
 * Counts the number of artists that match a given criteria, such as a name pattern. Returns an integer count.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLInt} type - The GraphQL type that this query will return (integer in this case).
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
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
