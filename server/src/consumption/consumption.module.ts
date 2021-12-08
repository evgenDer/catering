import { Consumption } from './consumption.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { MealsService } from './meals/meals.service';
import { Meal } from './meals/meal.entity';
import { DishesModule } from '../dishes/dishes.module';

@Module({
  controllers: [ConsumptionController],
  providers: [ConsumptionService, MealsService],
  imports: [TypeOrmModule.forFeature([Meal, Consumption]), DishesModule],
})
export class ConsumptionModule {}
