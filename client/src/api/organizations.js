import axios from 'axios';
import { config } from 'constants/api';

export const getAllOrganizations = async () => {
  try {
    const response = await axios.get(
      `${config.apiBaseUrl}organizations`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateOrganization = async (organizationId, organization) => {
  try {
    const response = await axios.put(
      `${config.apiBaseUrl}organizations/${organizationId}`,
      organization,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createOrganization = async (organization) => {
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}organizations`,
      organization,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
