import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation ($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            username
        }
    }
`

export const LOGIN_USER = gql`
    mutation ($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            username
        }
    }
`
export const ADD_FAVORITE = gql`
    mutation ($username: String!, $type: String!, $targetId: Int!) {
        addFavorite(username: $username, type: $type, targetId: $targetId) {
            username
        }
    }
`;