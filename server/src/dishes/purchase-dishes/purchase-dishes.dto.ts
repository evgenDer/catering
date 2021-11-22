import { DishDto } from '../dish.dto';

export interface PurchaseDishDto extends DishDto {
  id: number;
  cost: number;
  count: number;
  dishId?: number;
}
