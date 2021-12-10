import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { ConsumptionService } from './consumption.service';
import { CustomResponse, HttpMessages } from '../app.dto';

@Controller('consumptions')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req, @Body() consumption) {
    const userId = req.user?.id;

    const createdConsumption =
      await this.consumptionService.createCustomConsumption(
        consumption,
        userId,
      );

    return createdConsumption;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deletePurchaseDish(@Param('id') id): Promise<CustomResponse> {
    await this.consumptionService.delete(+id);

    return {
      status: HttpStatus.OK,
      message: HttpMessages.DELETED,
    };
  }

  @Get()
  async findAll(@Query() query: { date: string; userId: number }) {
    const data = query.date
      ? await this.consumptionService.getAllByDate(query.userId, query.date)
      : await this.consumptionService.getAllToday(query.userId);

    return data.reduce((currentConsumption, consumption) => {
      const { id, dish, count } = consumption;
      const meal = consumption.meal.name;

      if (currentConsumption[meal]) {
        const currentTotal = currentConsumption[meal].total;

        currentConsumption[meal].dishes.push({
          ...dish,
          count,
          consumptionId: id,
        });
        currentConsumption[meal].total = {
          protein: currentTotal.protein + dish.protein * count,
          fat: currentTotal.fat + dish.fat * count,
          carbohydrates:
            currentTotal.carbohydrates + dish.carbohydrates * count,
          calories: currentTotal.calories + dish.calories * count,
        };
      } else {
        currentConsumption[meal] = {
          dishes: [{ ...dish, count, consumptionId: id }],
          total: {
            protein: dish.protein * count,
            fat: dish.fat * count,
            carbohydrates: dish.carbohydrates * count,
            calories: dish.calories * count,
          },
        };
      }

      return currentConsumption;
    }, {});
  }
}
