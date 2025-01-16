import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const SIGNIN = gql`
  mutation Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      id
    }
  }
`;

export const WHOAMI = gql`
  query WhoAmI {
    whoAmI {
      id
      email
    }
  }
`;

export const SIGNOUT = gql`
  mutation Signout {
    signout
  }
`;
