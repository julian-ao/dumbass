const Song = require('../models/Song')
const Artist = require('../models/Artist')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLUnionType
} = require('graphql')


const FavoriteType = new GraphQLObjectType({
    name: 'Favorite',
    fields: {
        type: { type: GraphQLString },
        targetId: { type: GraphQLInt },
    },
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        favorites: { type: new GraphQLList(FavoriteType) },
    })
})

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        alternate_names: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLList(GraphQLString) },
        id: { type: GraphQLInt },
        image_url: { type: GraphQLString },
        name: { type: GraphQLString },
        average_rating: { type: GraphQLFloat },
        number_of_ratings: { type: GraphQLFloat }
    })
})

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

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        userName: { type: GraphQLString },
        content: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        targetType: { type: GraphQLString },
        targetId: { type: GraphQLInt }
    })
})

const SearchResultType = new GraphQLUnionType({
    name: 'SearchResult',
    types: [ArtistType, SongType],
    resolveType(value) {
      if(value instanceof Artist) {
        return 'Artist';
      }
      if(value instanceof Song) {
        return 'Song';
      }
    },
});

module.exports = {
    UserType,
    ArtistType,
    SongType,
    ReviewType,
    SearchResultType,
    FavoriteType
}




