import { Order } from './../../orders/order.entity';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Profile } from './../profiles/profile.entity';

@Entity({ name: 'user_account' })
export class Account extends BaseEntity {
  @Column({ type: 'numeric', nullable: false, default: 0 })
  balance: number;

  @OneToOne(() => Profile, (user) => user.account)
  profile: Profile;

  @OneToMany(() => Order, (order) => order.account)
  orders: Order;
}
