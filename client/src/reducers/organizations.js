import * as types from '../constants/actionTypes';

const initialState = [];

export default (organizations = initialState, action) => {
  switch (action.type) {
  case types.RETRIEVE_ORGANIZATIONS:
    return action.payload;
  case types.UPDATE_ORGANIZATION:
    return organizations.map((organization) => {
      if (organization.id === action.payload.id) {
        return {
          ...organization,
          ...action.payload,
        };
      }

      return organization;
    });
  case types.CREATE_ORGANIZATION:
    return [...organizations, action.payload];
  default:
    return organizations;
  }
};
