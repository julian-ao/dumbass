import { gql } from '@apollo/client';

export const GET_REVIEWS_BY_TARGET_ID = gql`
  query GetReviewsByTargetId($targetId: ID!) {
    reviewsByTargetId(targetId: $targetId) {
      user
      content
      rating
      targetType
      targetId
    }
  }
`;
