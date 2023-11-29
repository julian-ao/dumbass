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
        let matchQuery = {};
        const skip = (args.page - 1) * args.limit;
        const searchTermRegex = new RegExp(args.title, 'i');

        if (args.title !== null) {
            matchQuery.title = searchTermRegex;
        }

        if (args.sort.toLowerCase() === 'relevance') {
            return Song.aggregate([
                { $match: matchQuery },
                {
                    $addFields: {
                        startsWithSearchTerm: {
                            $cond: {
                                if: { $regexMatch: { input: "$title", regex: new RegExp('^' + args.title, 'i') } },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                { $sort: { startsWithSearchTerm: -1, title: 1 } },
                { $skip: skip },
                { $limit: args.limit }
            ]);
        } else if (args.sort.toLowerCase() === 'rating') {
            return Song.find(matchQuery)
                .sort({ average_rating: -1, number_of_ratings: -1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'alphabetical') {
            return Song.find(matchQuery)
                .sort({ title: 1 })
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
        let matchQuery = {};
        const skip = (args.page - 1) * args.limit;
        const searchTermRegex = new RegExp(args.name, 'i');

        if (args.name !== null) {
            matchQuery.name = searchTermRegex;
        }

        if (args.sort.toLowerCase() === 'relevance') {
            return Artist.aggregate([
                { $match: matchQuery },
                {
                    $addFields: {
                        startsWithSearchTerm: {
                            $cond: {
                                if: { $regexMatch: { input: "$name", regex: new RegExp('^' + args.name, 'i') } },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                { $sort: { startsWithSearchTerm: -1, name: 1 } },
                { $skip: skip },
                { $limit: args.limit }
            ]);
        } else if (args.sort.toLowerCase() === 'rating') {
            return Artist.find(matchQuery)
                .sort({ average_rating: -1, number_of_ratings: -1 })
                .skip(skip)
                .limit(args.limit)
        } else if (args.sort.toLowerCase() === 'alphabetical') {
            return Artist.find(matchQuery)
                .sort({ name: 1 })
                .skip(skip)
                .limit(args.limit)
        }
    }
}

module.exports = { searchSearchbar, getSongsOnTitle, getArtistsOnName }
