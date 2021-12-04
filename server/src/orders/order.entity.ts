import { Entity, Column, ManyToOne } from 'typeorm';

import { PurchaseDish } from './../dishes/purchase-dishes/purchase-dishes.entity';
import { BaseEntity } from '../base.entity';
import { Status } from './statuses/status.entity';
import { Account } from '../users/accounts/account.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  comment: string;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  count: number;

  @ManyToOne(() => Status, (status) => status.orders)
  status: Status;

  @ManyToOne(() => PurchaseDish, (dish) => dish.orders)
  purchaseDish: PurchaseDish;

  @ManyToOne(() => Account, (account) => account.orders)
  account: Account;
}
