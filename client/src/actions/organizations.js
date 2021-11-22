import * as OrganizationService from 'api/organizations';
import { HTTP_STATUSES } from 'constants/api';

import * as types from '../constants/actionTypes';

export const getAllOrganizations = () => async (dispatch) => {
  const { data, status } = await OrganizationService.getAllOrganizations();

  if (HTTP_STATUSES.SUCCESSFUL === status) {
    dispatch({
      type: types.RETRIEVE_ORGANIZATIONS,
      payload: data,
    });
  }
};

export const updateOrganization = (id, organization) => async (dispatch) => {
  try {
    const res = await OrganizationService.updateOrganization(id, organization);

    dispatch({
      type: types.UPDATE_ORGANIZATION,
      payload: organization,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createOrganization = (organization) => async (dispatch) => {
  try {
    const res = await OrganizationService.createOrganization(organization);

    dispatch({
      type: types.CREATE_ORGANIZATION,
      payload: res.data.organization,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
