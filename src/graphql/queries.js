/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestrant = /* GraphQL */ `
  query GetRestrant($id: ID!) {
    getRestrant(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRestrants = /* GraphQL */ `
  query ListRestrants(
    $filter: ModelRestrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
