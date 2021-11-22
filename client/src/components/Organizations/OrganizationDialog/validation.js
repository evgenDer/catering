import * as Yup from 'yup';

export const ERRORS = {
  MAX_LENGTH: 'Максимальная длина равна',
  REQUIRED: 'Обязательное поле',
  EMAIL: 'Неправильный формат почты',
  LENGTH: 'Длина должна быть',
};

const MAX_LENGTH = 100;
const LENGTH_CARD = 16;

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
  cardNumber: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .length(LENGTH_CARD, `${ERRORS.LENGTH} ${LENGTH_CARD}`),
  email: Yup.string()
    .email(ERRORS.EMAIL)
    .required(ERRORS.REQUIRED),
  phone: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
});
