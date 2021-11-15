import { getCalories } from 'utils/dishes';

export const createPayloadFromValues = (values, fileUrl) => ({
  ...values,
  calories: getCalories(values.fat, values.protein, values.carbohydrates),
  imageUrl: fileUrl || values.imageUrl,
});
