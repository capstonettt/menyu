/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      logo
      createdAt
      updatedAt
      owner
      categories {
        items {
          id
          restaurantID
          name
          createdAt
          updatedAt
          owner
          items {
            items {
              id
              categoryID
              name
              ingredients
              description
              price
              image
              vegan
              vege
              halal
              featured
              hidden
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        logo
        createdAt
        updatedAt
        owner
        categories {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      restaurantID
      name
      createdAt
      updatedAt
      owner
      items {
        items {
          id
          categoryID
          name
          description
          ingredients
          price
          image
          vegan
          vege
          halal
          featured
          hidden
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        restaurantID
        name
        createdAt
        updatedAt
        owner
        items {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      categoryID
      name
      description
      ingredients
      price
      image
      vegan
      vege
      halal
      featured
      hidden
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        categoryID
        name
        description
        ingredients
        price
        image
        vegan
        vege
        halal
        featured
        hidden
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
