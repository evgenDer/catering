export interface CreateProfileDto {
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories: number;
  cardNumber: string;
  organizationId: number;
}

export interface GetProfileDto {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  phone: string;
  goalCalories: number;
  cardNumber: string;
  organizationId: number;
}
