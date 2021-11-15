import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomResponse, HttpMessages } from '../app.dto';
import { DishDto } from './dish.dto';
import { DishesService } from './dishes.service';
import { PurchaseDishDto } from './purchase-dishes/purchase-dishes.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllDishes(): Promise<DishDto[]> {
    const dishes = await this.dishesService.getAllDishes();

    return dishes;
  }

  @Get('/purchase')
  @HttpCode(HttpStatus.OK)
  async getAllPurchaseDishes() {
    const dishes = await this.dishesService.getAllPurchaseDishes();

    return dishes;
  }

  @Put('/purchase/:id')
  @HttpCode(HttpStatus.OK)
  async updatePurchaseDish(
    @Param('id') id,
    @Body() purchaseDish: PurchaseDishDto,
  ): Promise<void> {
    await this.dishesService.updatePurchaseDish(id, purchaseDish);
  }

  @Get('/purchase/:id')
  @HttpCode(HttpStatus.OK)
  async getPurchaseDishById(@Param('id') id) {
    const dish = await this.dishesService.getPurchaseDishById(id);

    return dish;
  }

  @Delete('/purchase/:id')
  @HttpCode(HttpStatus.OK)
  async deletePurchaseDish(@Param('id') id): Promise<CustomResponse> {
    await this.dishesService.deletePurchaseDish(id);

    return {
      status: HttpStatus.OK,
      message: HttpMessages.DELETED,
    };
  }

  @Post('/purchase')
  @HttpCode(HttpStatus.CREATED)
  async createPurchaseDish(@Body() purchaseDish: PurchaseDishDto) {
    const createdDish = await this.dishesService.createPurchaseDish(
      purchaseDish,
    );

    return {
      status: HttpStatus.CREATED,
      message: HttpMessages.CREATED,
      dish: createdDish,
    };
  }
}
