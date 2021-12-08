import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getManager, Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { DishDto } from './dish.dto';
import { PurchaseDishDto } from './purchase-dishes/purchase-dishes.dto';
import { PurchaseDish } from './purchase-dishes/purchase-dishes.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(PurchaseDish)
    private readonly purchaseRepo: Repository<PurchaseDish>,
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
    private connection: Connection,
  ) {}

  // TODO: move to constants out of component
  private readonly caloriesProtein = 4;
  private readonly caloriesFat = 9;
  private readonly caloriesCarbohydrate = 4;
  private readonly relations = ['dish'];

  getCalories(protein: number, fat: number, carbohydrates: number): number {
    return (
      protein * this.caloriesProtein +
      fat * this.caloriesFat +
      carbohydrates * this.caloriesCarbohydrate
    );
  }

  getAllDishes(): Promise<Dish[]> {
    return this.dishRepo.find();
  }

  getAllPurchaseDishes() {
    return getManager()
      .createQueryBuilder()
      .select()
      .innerJoin(Dish, 'dish', 'dish.id = purchaseDish.dishId')
      .from(PurchaseDish, 'purchaseDish')
      .getRawMany();
  }

  getPurchaseDishById(id: number) {
    return getManager()
      .createQueryBuilder()
      .select()
      .innerJoin(Dish, 'dish', 'dish.id = purchaseDish.dishId')
      .where('purchaseDish.id = :id', { id })
      .from(PurchaseDish, 'purchaseDish')
      .getRawMany();
  }

  async deletePurchaseDish(id: number): Promise<void> {
    await this.purchaseRepo.delete(id);
  }

  async decreasePurchaseDishCount(purchaseDishId: number, count: number) {
    const outdatedDish = await this.purchaseRepo.findOne({
      relations: this.relations,
      where: { id: purchaseDishId },
    });

    return this.purchaseRepo.save({
      ...outdatedDish,
      count: Number(outdatedDish.count) - count,
    });
  }

  async updatePurchaseDish(
    purchaseDishId: number,
    purchaseDish: PurchaseDishDto,
  ): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const outdatedDish = await this.purchaseRepo.findOne({
        relations: this.relations,
        where: { id: purchaseDishId },
      });

      await queryRunner.manager.update(Dish, outdatedDish.dish.id, {
        protein: purchaseDish.protein,
        fat: purchaseDish.fat,
        carbohydrates: purchaseDish.carbohydrates,
        name: purchaseDish.name,
        imageUrl: purchaseDish.imageUrl,
        calories: this.getCalories(
          purchaseDish.protein,
          purchaseDish.fat,
          purchaseDish.carbohydrates,
        ),
      });

      await queryRunner.manager.update(PurchaseDish, purchaseDishId, {
        cost: purchaseDish.cost,
        count: purchaseDish.count,
        dish: outdatedDish.dish,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Database exception');
    } finally {
      await queryRunner.release();
    }
  }

  async createDish(dish: DishDto): Promise<Dish> {
    return this.dishRepo.save({
      protein: dish.protein,
      fat: dish.fat,
      carbohydrates: dish.carbohydrates,
      name: dish.name,
      calories: this.getCalories(dish.protein, dish.fat, dish.carbohydrates),
    });
  }

  async createPurchaseDish(purchaseDish: PurchaseDishDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dish = await queryRunner.manager.save(Dish, {
        protein: purchaseDish.protein,
        fat: purchaseDish.fat,
        carbohydrates: purchaseDish.carbohydrates,
        name: purchaseDish.name,
        imageUrl: purchaseDish.imageUrl,
        calories: this.getCalories(
          purchaseDish.protein,
          purchaseDish.fat,
          purchaseDish.carbohydrates,
        ),
      });

      const createdDish = await queryRunner.manager.save(PurchaseDish, {
        cost: purchaseDish.cost,
        count: purchaseDish.count,
        dish,
      });

      await queryRunner.commitTransaction();

      return {
        ...createdDish,
        ...dish,
      };
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Database exception');
    } finally {
      await queryRunner.release();
    }
  }
}
