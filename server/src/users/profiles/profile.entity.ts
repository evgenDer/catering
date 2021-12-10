import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { Organization } from './../../organizations/organization.entity';
import { BaseEntity } from '../../base.entity';
import { User } from '../user.entity';
import { Account } from '../accounts/account.entity';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  surname: string;

  @Column({ type: 'date', nullable: false })
  birthday: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  phone: string;

  @Column({ type: 'numeric', nullable: true })
  goalCalories: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSharingAvailable: boolean;

  @Column({ type: 'int4', nullable: true })
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.profiles)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => Account, (account) => account.profile)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
