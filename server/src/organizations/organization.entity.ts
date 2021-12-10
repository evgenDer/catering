import { OrganizationPayment } from './organizations-payment/organization-payment.entity';
import { Entity, Column, OneToMany } from 'typeorm';

import { Profile } from './../users/profiles/profile.entity';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'organization' })
export class Organization extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  phone: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Profile, (profile) => profile.organization)
  profiles: Profile[];

  @OneToMany(() => OrganizationPayment, (profile) => profile.organization)
  payments: OrganizationPayment[];
}
