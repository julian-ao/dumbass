import { gql } from '@apollo/client'

export const ADD_REVIEW = gql`
    mutation (
        $userName: String!
        $content: String
        $rating: Int!
        $targetType: String!
        $targetId: Int!
    ) {
        addReview(
            userName: $userName
            content: $content
            rating: $rating
            targetType: $targetType
            targetId: $targetId
        ) {
            userName
            content
            rating
            targetType
            targetId
        }
    }
`
