import { gql } from '@apollo/client'


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

export const GET_ARTISTS_BY_ID = gql`
    query ($ids: [Int]!) {
        getArtistsByIds(ids: $ids) {
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

export const GET_ARTISTS_ON_NAME = gql`
    query ($name: String, $limit: Int, $sort: String, $page: Int) {
        getArtistsOnName(name: $name, limit: $limit, sort: $sort, page: $page) {
            id
            name
            alternate_names
            image_url
            average_rating
            number_of_ratings
        }
    }
`

export const COUNT_ARTISTS = gql`
    query ($name: String) {
        countArtists(name: $name)
    }
`
