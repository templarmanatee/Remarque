import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SPREAD = gql`
  mutation addSpread($date: String!) {
    addSpread(date: $date) {
      _id
      monday
    }
  }
`;

export const ADD_PLANNERITEM = gql`
  mutation addPlannerItem($title: String!, $body: String, $scheduled: String, $status: String, $collections: [ID]) {
    addPlannerItem(title: $title, body: $body, scheduled: $scheduled, status: $status, collections: $collections) {
      _id
      title
    }
  }
`;

export const UPDATE_GRIDITEM = gql`
  mutation UpdateGridItem($id: ID!, $title: String, $body: [String]) {
    updateGridItem(_id: $id, title: $title, body: $body) {
      _id
    }
  }
`;

export const UPDATE_PLANNERITEM = gql`
  mutation UpdatePlannerItem(
    $id: ID!
    $title: String
    $body: String
    $scheduled: String
    $status: String
    $collections: [ID]
  ) {
    updatePlannerItem(_id: $id, title: $title, body: $body, scheduled: $scheduled, status: $status, collections: $collections,) {
      _id
      title
      body
      scheduled
      collections
    }
  }
`;
