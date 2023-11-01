import { gql } from '@apollo/client';

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
`;