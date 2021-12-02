import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Dish } from '../dish.entity';
import { Order } from '../../orders/order.entity';

@Entity({ name: 'purchase_dish' })
export class PurchaseDish extends BaseEntity {
  @Column({ type: 'float', nullable: false })
  cost: number;

  @Column({ type: 'int4', nullable: false, default: 0 })
  count: number;

  @OneToOne(() => Dish, (dish) => dish.id)
  @JoinColumn()
  dish: Dish;

  @OneToMany(() => Order, (order) => order.purchaseDish)
  orders: Order[];
}
