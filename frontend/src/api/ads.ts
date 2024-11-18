import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query Ads {
    ads {
      id
      picture
      title
      price
      description
      owner
      location
    }
  }
`;

export const GET_AD = gql`
  query Ad($adId: ID!) {
    ad(id: $adId) {
      id
      title
      description
      price
      picture
      owner
      location
      createdAt
      tags {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAdd($data: AdUpdateInput!, $adId: ID!) {
    updateAdd(data: $data, id: $adId) {
      id
      title
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($adId: ID!) {
    deleteAd(id: $adId) {
      id
    }
  }
`;
