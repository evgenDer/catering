import { GENDERS } from 'constants/application';

export const getAge = (date) => {
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();

  return age;
};

export const calculateCalories = (birthday, height, weight, gender) => {
  const birthDate = new Date(birthday);
  const age = getAge(birthDate);

  if (GENDERS.MAN === gender) {
    return 66.5 + (13.7 * weight) + (5 * height) - (6.8 * age);
  } if (GENDERS.WOMAN === gender) {
    return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  }

  return '';
};
