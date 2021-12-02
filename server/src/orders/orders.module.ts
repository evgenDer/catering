import { Status } from './statuses/status.entity';
import { StatusesService } from './statuses/statuses.service';
import { Dish } from './../dishes/dish.entity';
import { DishesService } from './../dishes/dishes.service';
import { PurchaseDish } from './../dishes/purchase-dishes/purchase-dishes.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Account } from '../users/accounts/account.entity';
import { AccountsService } from '../users/accounts/accounts.service';
import { Order } from './order.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, AccountsService, DishesService, StatusesService],
  imports: [
    TypeOrmModule.forFeature([Order, Account, PurchaseDish, Dish, Status]),
  ],
})
export class OrdersModule {}
