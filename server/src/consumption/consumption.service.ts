import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { DishesService } from './../dishes/dishes.service';
import { MealsService } from './meals/meals.service';
import { Consumption } from './consumption.entity';
import { CreateUserConsumptionDto } from './consumption.dto';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private readonly consumptionRepo: Repository<Consumption>,
    private readonly mealsService: MealsService,
    private readonly dishService: DishesService,
  ) {}

  private readonly relations = ['meal', 'dish'];

  async delete(id: number) {
    await this.consumptionRepo.delete(id);
  }

  getAllToday(userId: number) {
    return this.consumptionRepo.find({
      relations: this.relations,
      where: {
        userId,
        createdAt: Raw((alias) => `DATE(${alias}) = current_date`),
      },
    });
  }

  getAllByDate(userId: number, date: string) {
    return this.consumptionRepo.find({
      relations: this.relations,
      where: {
        userId,
        createdAt: Raw((alias) => `DATE(${alias}) = '${date}'`),
      },
    });
  }

  async createCustomConsumption(
    consumption: CreateUserConsumptionDto,
    userId: number,
  ) {
    const dish = await this.dishService.createDish(consumption.dish);

    const createdConsumption = await this.create(
      dish.id,
      userId,
      consumption.meal,
      consumption.count,
    );

    return {
      ...dish,
      consumptionId: createdConsumption.id,
      count: createdConsumption.count,
    };
  }

  async create(dishId: number, userId: number, mealName?: string, count = 1) {
    const meal = mealName
      ? await this.mealsService.getByName(mealName)
      : await this.mealsService.getByCurrentDate();

    return this.consumptionRepo.save({
      userId,
      dishId,
      meal,
      count,
    });
  }
}
