import { ROLES } from 'constants/application';

export const createPayloadFromValues = (values, roles) => ({
  email: values.username,
  password: values.password,
  roleId: roles.find((role) => role.name === values.roleName).id,
  profile: values.roleName !== ROLES.ADMIN ? {
    organizationId: values.organizationId,
    name: values.name,
    surname: values.surname,
    birthday: values.birthday,
    phone: values.phone,
    goalCalories: values.goalCalories || null,
    isSharingAvailable: values.roleName === ROLES.USER && values.isSharingAvailable,
  } : null,
});
