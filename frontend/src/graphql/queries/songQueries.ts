import { gql } from '@apollo/client'

export const GET_TOP_SONGS = gql`
    query ($limit: Int) {
        getTopSongs(limit: $limit) {
            id
            title
            artist_names
            header_image_url
            release_date
            primary_artist_id
            average_rating
            number_of_ratings
        }
    }
`

export const GET_SONG_BY_ID = gql`
    query ($id: ID!) {
        getSongById(id: $id) {
            lyrics
            header_image_url
            release_date
            title
            artist_names
            average_rating
            number_of_ratings
        }
    }
`

export const GET_SONGS_BY_ID = gql`
    query ($ids: [ID!]!) {
        getSongsByIds(ids: $ids) {
            id
            title
            artist_names
            header_image_url
            release_date
            primary_artist_id
            average_rating
            number_of_ratings
        }
    }
`
