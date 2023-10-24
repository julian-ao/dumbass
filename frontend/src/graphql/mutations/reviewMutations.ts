import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation AddReview($user: ID!, $content: String!, $rating: Int!, $targetType: String!, $targetId: ID!) {
    addReview(user: $user, content: $content, rating: $rating, targetType: $targetType, targetId: $targetId) {
      user
      content
      rating
      targetType
      targetId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
