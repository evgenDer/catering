import * as Yup from 'yup';

import { ROLES } from 'constants/application';

export const ERRORS = {
  MAX_LENGTH: 'Максимальная длина равна',
  REQUIRED: 'Обязательное поле',
  POSITIVE: 'Число должно быть положительным',
};

const MAX_LENGTH = 100;

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email(ERRORS.EMAIL)
    .required(ERRORS.REQUIRED),
  password: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
  name: Yup.string().trim()
    .when('roleName', {
      is: (roleName) => roleName !== ROLES.ADMIN,
      then: Yup.string().required(ERRORS.REQUIRED)
        .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
    }),
  surname: Yup.string().trim()
    .when('roleName', {
      is: (roleName) => roleName !== ROLES.ADMIN,
      then: Yup.string().required(ERRORS.REQUIRED)
        .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
    }),
  birthday: Yup.date()
    .when('roleName', {
      is: (roleName) => roleName !== ROLES.ADMIN,
      then: Yup.date().required(ERRORS.REQUIRED),
    }),
  goalCalories: Yup.number()
    .when('roleName', {
      is: (roleName) => roleName !== ROLES.ADMIN,
      then: Yup.number().positive(ERRORS.POSITIVE),
    }),
  phone: Yup.string().trim()
    .when('roleName', {
      is: (roleName) => roleName !== ROLES.ADMIN,
      then: Yup.string().required(ERRORS.REQUIRED)
        .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
    }),
  roleName: Yup.string().trim().required(ERRORS.REQUIRED),
  organizationId: Yup.number().when('roleName', {
    is: (roleName) => roleName !== ROLES.ADMIN,
    then: Yup.number().required(ERRORS.REQUIRED),
  }),
});
