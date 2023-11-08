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
    query ($ids: [Int]!) {
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
export const GET_SONGS_ON_TITLE = gql`
query ($title: String, $limit: Int, $sort: String, $page: Int) {
    getSongsOnTitle(title: $title, limit: $limit, sort: $sort, page: $page) {
        header_image_url
        id
        title
        artist_names
        average_rating
        number_of_ratings
        release_date
    }
}
`

export const COUNT_SONGS = gql`
query ($title: String) {
    countSongs(title: $title)
}
`
