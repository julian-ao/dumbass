import { gql } from '@apollo/client';

export const GET_TOP_SONGS = gql`
    query ($limit: Int) {
        getTopSongs(limit: $limit)  {
            id
            title
            artist_names
            description
            header_image_url
            release_date
            primary_artist_id
            average_rating
            number_of_ratings
            lyrics
        }
    }
`;