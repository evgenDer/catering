import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { Order } from './../order.entity';

@Entity({ name: 'order_status' })
export class Status extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}
