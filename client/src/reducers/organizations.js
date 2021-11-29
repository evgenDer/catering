import * as types from '../constants/actionTypes';

const initialState = [];

const organizationReducer = {
  organizations: (organizations = initialState, action) => {
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
  },
  organization: (organization = {}, action) => {
    switch (action.type) {
    case types.CREATE_ORGANIZATION_PAYMENT:
      return {
        ...organization,
        currentPayment: action.payload,
      };
    case types.RETRIEVE_ORGANIZATION:
      return {
        ...organization,
        ...action.payload,
      };
    case types.RETRIEVE_PAYMENTS:
      return {
        ...organization,
        payments: action.payload,
      };
    default:
      return organization;
    }
  },
};

export default organizationReducer;
