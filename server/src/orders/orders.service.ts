import { StatusesService } from './statuses/statuses.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { DishesService } from './../dishes/dishes.service';
import { AccountsService } from '../users/accounts/accounts.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order } from './order.entity';
import { Statuses } from './statuses/statuses.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly accountService: AccountsService,
    private readonly dishesService: DishesService,
    private readonly statusesService: StatusesService,
  ) {}

  private readonly relations = [
    'status',
    'purchaseDish',
    'account',
    'purchaseDish.dish',
    'account.profile',
  ];

  async create(createOrderDto: CreateOrderDto) {
    const { address, accountId, comment, totalCost } = createOrderDto;

    const status = await this.statusesService.getByStatusName();
    const account = await this.accountService.decrease(accountId, totalCost);

    createOrderDto.items.forEach(async ({ purchasedDishId, count }) => {
      const purchaseDish = await this.dishesService.decreasePurchaseDishCount(
        purchasedDishId,
        count,
      );

      this.orderRepo.save({
        purchaseDish,
        account,
        status,
        address,
        count,
        comment: comment || null,
      });
    });
  }

  findAll() {
    return this.orderRepo.find({ relations: this.relations });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({
      relations: this.relations,
      where: { id },
    });
  }

  findActiveUserOrders(id: number) {
    return this.orderRepo.find({
      relations: this.relations,
      where: {
        status: { name: Not(Statuses.DELIVERED) },
        account: { id },
      },
    });
  }

  findByAccountId(id: number) {
    return this.orderRepo.find({
      relations: this.relations,
      where: {
        account: { id },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const status = await this.statusesService.getByStatusName(
      updateOrderDto.status,
    );
    const order = await this.findOne(id);

    this.orderRepo.update(id, {
      address: order.address,
      comment: order.comment,
      purchaseDish: order.purchaseDish,
      account: order.account,
      status,
    });

    return {
      ...order,
      status,
    };
  }
}
