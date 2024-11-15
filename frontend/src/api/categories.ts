import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_ADS = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
      ads {
        title
        price
        picture
        owner
        location
        id
        description
        createdAt
      }
    }
  }
`;
