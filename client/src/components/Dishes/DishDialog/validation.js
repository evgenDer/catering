import * as Yup from 'yup';

export const ERRORS = {
  MAX_LENGTH: 'Максимальная длина равна',
  REQUIRED: 'Обязательное поле',
  POSITIVE: 'Число должно быть положительным',
};

const MAX_LENGTH = 100;

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required(ERRORS.REQUIRED)
    .max(MAX_LENGTH, `${ERRORS.MAX_LENGTH} ${MAX_LENGTH}`),
  protein: Yup.number()
    .required(ERRORS.REQUIRED)
    .min(0, ERRORS.POSITIVE),
  fat: Yup.number()
    .required(ERRORS.REQUIRED)
    .min(0, ERRORS.POSITIVE),
  carbohydrates: Yup.number()
    .required(ERRORS.REQUIRED)
    .min(0, ERRORS.POSITIVE),
  cost: Yup.string().when('isPurchasedDish', {
    is: true,
    then: Yup.number()
      .required(ERRORS.REQUIRED)
      .positive(ERRORS.POSITIVE),
  }),
  count: Yup.number()
    .required(ERRORS.REQUIRED),
});
