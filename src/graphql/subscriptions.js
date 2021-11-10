/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant($owner: String) {
    onCreateRestaurant(owner: $owner) {
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
        }
        nextToken
      }
    }
  }
`;
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant($owner: String) {
    onUpdateRestaurant(owner: $owner) {
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
        }
        nextToken
      }
    }
  }
`;
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant($owner: String) {
    onDeleteRestaurant(owner: $owner) {
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($owner: String) {
    onCreateItem(owner: $owner) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($owner: String) {
    onUpdateItem(owner: $owner) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($owner: String) {
    onDeleteItem(owner: $owner) {
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
