import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            username
        }
    }
`

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            username
        }
    }
`
