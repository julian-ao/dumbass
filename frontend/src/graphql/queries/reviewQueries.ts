import { gql } from '@apollo/client'

export const GET_REVIEWS_BY_TARGET_ID = gql`
    query ($targetType: String!, $targetId: Int!) {
        getReviewsByTarget(targetType: $targetType, targetId: $targetId) {
            userName
            content
            rating
        }
    }
`
