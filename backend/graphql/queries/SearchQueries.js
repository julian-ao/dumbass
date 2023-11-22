const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql')
const { SearchResultType } = require('../types/SearchResultType')
const { SongType } = require('../types/SongType')
const { ArtistType } = require('../types/ArtistType')
const Artist = require('../../models/Artist')
const Song = require('../../models/Song')

/**
 * GraphQL Query Field - searchSearchbar.
 *
 * Performs a search based on the provided searchString and searchType ('artist' or 'song').
 * Returns a list of SearchResultType objects containing the search results.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(SearchResultType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const searchSearchbar = {
    type: new GraphQLList(SearchResultType),
    args: {
        searchString: { type: new GraphQLNonNull(GraphQLString) },
        searchType: { type: new GraphQLNonNull(GraphQLString) }, // 'artist' or 'song'
        limit: { type: GraphQLInt }
    },
    resolve: async (parent, { searchString, searchType, limit }) => {
        const regex = new RegExp('^' + searchString, 'i')
        let query = {}

        if (searchType === 'artist') {
            query = { name: { $regex: regex } }
        } else if (searchType === 'song') {
            query = { title: { $regex: regex } }
        }
        try {
            if (typeof limit === 'number' && limit > 0) {
                return searchType === 'artist'
                    ? Artist.find(query).limit(limit)
                    : Song.find(query).limit(limit)
            }
            return searchType === 'artist'
                ? Artist.find(query)
                : Song.find(query)
        } catch (error) {
            throw new Error('Error searching: ' + error.message)
        }
    }
}

/**
 * GraphQL Query Field - getSongsOnTitle.
 *
 * Retrieves a list of songs based on the provided title, sorting options, and pagination parameters.
 * Returns a list of SongType objects.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(SongType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const getSongsOnTitle = {
    type: new GraphQLList(SongType),
    args: {
        limit: { type: GraphQLInt },
        title: { type: GraphQLString, defaultValue: null },
        sort: { type: GraphQLString },
        page: { type: GraphQLInt }
    },
    resolve: async (parent, args) => {
        let query = {}
        const skip = (args.page - 1) * args.limit

        if (args.title !== null) {
            query.title = new RegExp(args.title, 'i')
        }

        if (args.sort.toLowerCase() === 'rating') {
            return Song.find(query)
                .sort({ average_rating: -1, number_of_ratings: -1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'alphabetical') {
            return Song.find(query)
                .sort({ title: 1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'relevance') {
            return Song.find({
                title: { $regex: '^' + args.title, $options: 'i' }
            })
                .skip(skip)
                .limit(args.limit)
        }
    }
}

/**
 * GraphQL Query Field - getArtistsOnName.
 *
 * Retrieves a list of artists based on the provided name, sorting options, and pagination parameters.
 * Returns a list of ArtistType objects.
 *
 * @type {Object} GraphQL query configuration object.
 * @property {GraphQLList(ArtistType)} type - The GraphQL type that this query will return.
 * @property {Object} args - Arguments required for this query.
 * @property {function} resolve - The resolver function to execute the query.
 */
const getArtistsOnName = {
    type: new GraphQLList(ArtistType),
    args: {
        limit: { type: GraphQLInt },
        name: { type: GraphQLString, defaultValue: null },
        sort: { type: GraphQLString },
        page: { type: GraphQLInt }
    },
    resolve: async (parent, args) => {
        let query = {}
        const skip = (args.page - 1) * args.limit

        if (args.name !== null) {
            query.name = new RegExp(args.name, 'i')
        }

        if (args.sort.toLowerCase() === 'rating') {
            return Artist.find(query)
                .sort({ average_rating: -1, number_of_ratings: -1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'alphabetical') {
            return Artist.find(query)
                .sort({ name: 1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'relevance') {
            return Artist.find({
                name: { $regex: '^' + args.name, $options: 'i' }
            })
                .skip(skip)
                .limit(args.limit)
        }
    }
}

module.exports = { searchSearchbar, getSongsOnTitle, getArtistsOnName }
