/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestrant = /* GraphQL */ `
  mutation CreateRestrant(
    $input: CreateRestrantInput!
    $condition: ModelRestrantConditionInput
  ) {
    createRestrant(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateRestrant = /* GraphQL */ `
  mutation UpdateRestrant(
    $input: UpdateRestrantInput!
    $condition: ModelRestrantConditionInput
  ) {
    updateRestrant(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteRestrant = /* GraphQL */ `
  mutation DeleteRestrant(
    $input: DeleteRestrantInput!
    $condition: ModelRestrantConditionInput
  ) {
    deleteRestrant(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
