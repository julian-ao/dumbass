import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            username
            email
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
