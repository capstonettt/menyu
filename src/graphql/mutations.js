/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
