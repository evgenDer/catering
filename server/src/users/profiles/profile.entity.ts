import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';

import { Organization } from './../../organizations/organization.entity';
import { BaseEntity } from '../../base.entity';
import { User } from '../user.entity';

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

  @ManyToOne(() => Organization, (organization) => organization.profiles)
  organization: Organization;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
