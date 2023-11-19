import { gql } from '@apollo/client'

export const SEARCHBAR_DROPDOWN = gql`
    query ($searchType: String!, $searchString: String!, $limit: Int) {
        searchSearchbar(
            searchType: $searchType
            searchString: $searchString
            limit: $limit
        ) {
            ... on Artist {
                name
                id
            }
            ... on Song {
                title
                id
            }
        }
    }
`
