const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = require('graphql')

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
