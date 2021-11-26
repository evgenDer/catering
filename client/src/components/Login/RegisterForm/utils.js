export const createPayloadFromValues = (values, roles) => ({
  email: values.username,
  password: values.password,
  roleId: roles.find((role) => role.name === values.roleName).id,
  profile: {
    organizationId: values.organizationId,
    name: values.name,
    surname: values.surname,
    birthday: values.birthday,
    phone: values.phone,
    goalCalories: values.goalCalories,
  },
});
