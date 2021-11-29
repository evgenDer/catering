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

export const getOrganization = async (organizationId) => {
  try {
    const response = await http.get(
      `organizations/${organizationId}`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createOrganizationPayment = async (organizationId, payment) => {
  try {
    const response = await http.post(
      `organizations/${organizationId}/payment`,
      payment,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getOrganizationPayments = async (organizationId) => {
  try {
    const response = await http.get(
      `organizations/${organizationId}/payments`,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
