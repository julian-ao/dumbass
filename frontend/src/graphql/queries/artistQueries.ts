import { gql } from '@apollo/client'

export const GET_TOP_ARTISTS = gql`
    query ($limit: Int) {
        getTopArtists(limit: $limit) {
            id
            name
            alternate_names
            description
            image_url
            average_rating
            number_of_ratings
        }
    }
`

export const GET_ARTIST_BY_ID = gql`
    query ($id: ID!) {
        getArtistById(id: $id) {
            alternate_names
            description
            image_url
            name
            average_rating
            number_of_ratings
        }
    }
`

export const GET_ARTISTS_ON_NAME = gql`
    query ($name: String, $limit: Int, $sort: String) {
        getArtistsOnName(name: $name, limit: $limit, sort: $sort) {
            id
            name
            alternate_names
            image_url
            average_rating
            number_of_ratings
        }
    }
`
