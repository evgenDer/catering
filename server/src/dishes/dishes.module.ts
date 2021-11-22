import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { PurchaseDish } from './purchase-dishes/purchase-dishes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, PurchaseDish])],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
