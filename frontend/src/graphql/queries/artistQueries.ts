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
