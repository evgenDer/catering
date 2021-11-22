import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'organization' })
export class Organization extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  cardNumber: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
