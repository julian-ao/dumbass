const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = require('graphql')

/**
 * GraphQL Object Type for Song.
 * 
 * Represents a song with various properties like lyrics, ID, image URL, release date, artist details, and ratings.
 * This type is used in GraphQL queries and mutations to define the structure of a song object.
 * 
 * @type {GraphQLObjectType}
 * 
 * @property {GraphQLString} lyrics - The lyrics of the song.
 * @property {GraphQLInt} id - The unique identifier of the song.
 * @property {GraphQLString} header_image_url - The URL of the song's header image.
 * @property {GraphQLString} release_date - The release date of the song.
 * @property {GraphQLString} primary_artist_id - The unique identifier of the primary artist of the song.
 * @property {GraphQLString} title - The title of the song.
 * @property {GraphQLString} artist_names - The names of the artists associated with the song.
 * @property {GraphQLFloat} average_rating - The average rating of the song.
 * @property {GraphQLFloat} number_of_ratings - The number of ratings the song has received.
 */
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

module.exports = { SongType }
