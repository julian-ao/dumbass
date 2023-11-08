import { gql } from '@apollo/client'

export const CHECK_IF_FAVORITE = gql`
    query ($username: String!, $type: String!, $targetId: Int!) {
        checkIfFavorite(username: $username, type: $type, targetId: $targetId)
    }
`

export const GET_FAVORITES = gql`
    query ($username: String!) {
        getFavorites(username: $username) {
            type
            targetId
        }
    }
`