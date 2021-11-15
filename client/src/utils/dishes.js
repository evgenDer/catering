import { CALORIES_CARBOHYDRATES, CALORIES_FAT, CALORIES_PROTEIN } from 'constants/dishes';

export const getCalories = (fat, protein, carbohydrates) => fat * CALORIES_FAT + protein * CALORIES_PROTEIN + carbohydrates * CALORIES_CARBOHYDRATES;
