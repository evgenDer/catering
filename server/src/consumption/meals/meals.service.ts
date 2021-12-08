import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { Meal } from './meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepo: Repository<Meal>,
  ) {}

  getByName(name: string) {
    return this.mealRepo.findOne({
      where: {
        name,
      },
    });
  }

  getByCurrentDate() {
    return this.mealRepo.findOne({
      where: [
        {
          startTime: Raw((alias) => `${alias} >= current_time`),
          endTime: Raw((alias) => `${alias} < current_time`),
        },
        {
          endTime: Raw((alias) => `${alias} is null`),
        },
      ],
    });
  }
}
