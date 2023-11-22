const { GraphQLUnionType } = require('graphql')
const { ArtistType } = require('./ArtistType')
const { SongType } = require('./SongType')
const Artist = require('../../models/Artist')
const Song = require('../../models/Song')

/**
 * GraphQL Union Type for Search Results.
 *
 * Represents a search result that can be either an Artist or a Song. This union type allows for returning a list of
 * two types (Artist and Song) as a single query result. The `resolveType` function determines the specific
 * type (Artist or Song) of the returned object based on its instance.
 *
 * @type {GraphQLUnionType}
 *
 * @property {Array<GraphQLObjectType>} types - The possible types that can be returned by this union type.
 *                                              In this case, it can be either ArtistType or SongType.
 * @property {function} resolveType - A function that determines the type of the provided value. If the value
 *                                    is an instance of Artist, it returns 'Artist'. If it's an instance of Song,
 *                                    it returns 'Song'.
 */
const SearchResultType = new GraphQLUnionType({
    name: 'SearchResult',
    types: [ArtistType, SongType],
    resolveType(value) {
        if (value instanceof Artist) {
            return 'Artist'
        }
        if (value instanceof Song) {
            return 'Song'
        }
    }
})

module.exports = { SearchResultType }
