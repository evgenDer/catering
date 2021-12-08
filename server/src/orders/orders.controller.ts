import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';

import { SkipAuth } from 'src/auth/skip-auth.decorator';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user?.id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('account/:id')
  @SkipAuth()
  findByAccountId(@Param('id') id: string) {
    return this.ordersService.findByAccountId(+id);
  }

  @Get('account/:id/active')
  @SkipAuth()
  findActiveUserOrders(@Param('id') id: string) {
    return this.ordersService.findActiveUserOrders(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }
}
