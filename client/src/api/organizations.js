import { http } from './config';

export const getAllOrganizations = async () => {
  try {
    const response = await http.get(
      'organizations',
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateOrganization = async (organizationId, organization) => {
  try {
    const response = await http.put(
      `organizations/${organizationId}`,
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
    const response = await http.post(
      'organizations',
      organization,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
