import { gql } from "../gql";

export const GET_TAGS = gql(`
  query Tags {
    tags {
      id
      name
    }
  }
`);

export const CREATE_TAG = gql(`
  mutation AddTag($data: CreateTagInput!) {
    createTag(data: $data) {
      name
      id
    }
  }
`);
