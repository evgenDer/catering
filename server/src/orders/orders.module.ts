import { ConsumptionService } from './../consumption/consumption.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Consumption } from '../consumption/consumption.entity';
import { Status } from './statuses/status.entity';
import { StatusesService } from './statuses/statuses.service';
import { Dish } from './../dishes/dish.entity';
import { DishesService } from './../dishes/dishes.service';
import { PurchaseDish } from './../dishes/purchase-dishes/purchase-dishes.entity';
import { MealsService } from './../consumption/meals/meals.service';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Account } from '../users/accounts/account.entity';
import { AccountsService } from '../users/accounts/accounts.service';
import { Order } from './order.entity';
import { Meal } from '../consumption/meals/meal.entity';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    AccountsService,
    DishesService,
    StatusesService,
    ConsumptionService,
    MealsService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Account,
      PurchaseDish,
      Dish,
      Status,
      Consumption,
      Meal,
    ]),
  ],
})
export class OrdersModule {}
