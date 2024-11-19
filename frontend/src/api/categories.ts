import { gql } from "../gql";

export const GET_CATEGORIES = gql(`
  query Categories {
    categories {
      id
      name
    }
  }
`);

export const GET_CATEGORY_ADS = gql(`
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
        category{
        id
        name
        }
      }
    }
  }
`);

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      name
      id
    }
  }
`);
