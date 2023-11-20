const { GraphQLUnionType } = require('graphql')
const { ArtistType } = require('./ArtistType')
const { SongType } = require('./SongType')
const Artist = require('../../models/Artist')
const Song = require('../../models/Song')

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
