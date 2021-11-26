import * as Yup from 'yup';

export const ERRORS = {
  MAX_LENGTH: 'Максимальная длина равна',
  REQUIRED: 'Обязательное поле',
  EMAIL: 'Неправильный формат почты',
};

const MAX_LENGTH = 100;

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
  email: Yup.string()
    .email(ERRORS.EMAIL)
    .required(ERRORS.REQUIRED),
  phone: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
});
