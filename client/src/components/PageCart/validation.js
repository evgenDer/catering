import * as Yup from 'yup';

export const addressValidationSchema = Yup.object().shape({
  address: Yup.string().required(),
  comment: Yup.string(),
});

export const orderItemValidationSchema = Yup.object({
  productId: Yup.string().required(),
  accountId: Yup.string().required(),
  count: Yup.number().integer().positive().required(),
}).defined();

export const orderValidationSchema = Yup.object({
  id: Yup.string().required(),
  items: Yup.array().of(orderItemValidationSchema),
  address: Yup.string().required(),
  comment: Yup.string(),
  totalPrice: Yup.number(),
}).defined();
