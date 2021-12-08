import { DishDto } from '../dishes/dish.dto';

export interface CreateUserConsumptionDto {
  count: number;
  dish: DishDto;
  meal: string;
}
