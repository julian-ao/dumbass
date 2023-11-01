import { gql } from '@apollo/client'

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
