import { Entity, Column, ManyToOne } from 'typeorm';

import { Organization } from '../organization.entity';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'organization_payment' })
export class OrganizationPayment extends BaseEntity {
  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'numeric', nullable: false })
  sum: number;

  @ManyToOne(() => Organization, (organization) => organization.payments)
  organization: Organization;
}
