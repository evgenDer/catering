import * as types from 'constants/actionTypes';
import * as RoleService from 'api/roles';

export const getRoles = () => async (dispatch) => {
  try {
    const { data } = await RoleService.getRoles();

    dispatch({
      type: types.RETRIEVE_ROLES,
      payload: data.roles,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
