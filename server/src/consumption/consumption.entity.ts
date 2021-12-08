import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Dish } from '../dishes/dish.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from '../base.entity';
import { Meal } from './meals/meal.entity';

@Entity({ name: 'consumption' })
export class Consumption extends BaseEntity {
  @Column({ type: 'numeric', nullable: false, default: 1 })
  count: number;

  @Column({ type: 'int4', nullable: false })
  dishId: number;

  @Column({ type: 'int4', nullable: false })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dishId' })
  dish: Dish;

  @ManyToOne(() => Meal)
  meal: Meal;
}
