import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User {
    user {
      _id
      username
      email
      password
      spreads {
        _id
        monday
        weeklyCollections {
          _id
          title
          userId
          plannerItems {
            _id
            title
            body
            scheduled
            status
            collections
          }
        }
        gridItems {
          _id
          title
          body
          i
        }
        layout {
          _id
          i
          x
          y
          w
          h
          minW
          maxW
          minH
          maxH
          card
        }
        userId
      }
      collections {
        _id
        title
        plannerItems {
          _id
          title
          body
          scheduled
          status
          collections
        }
        userId
      }
    }
  }
`;

export const QUERY_SPREAD = gql`
  query SpreadById($id: ID) {
    spreadById(_id: $id) {
      _id
      gridItems {
        _id
        title
        body
        i
      }
      monday
      weeklyCollections {
        _id
        title
        userId
        plannerItems {
          _id
          title
          body
          scheduled
          status
          collections
        }
      }
      layout {
        _id
        i
        x
        y
        w
        h
        minW
        maxW
        minH
        maxH
        card
      }
      userId
    }
  }
`;

export const USER_SPREADS = gql`
  query UserSpreads {
    userSpreads {
      _id
      monday
    }
  }
`;
