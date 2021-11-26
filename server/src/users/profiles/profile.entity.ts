import { Organization } from './../../organizations/organization.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base.entity';

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

  @Column({ type: 'numeric', nullable: true, default: 1200 })
  goalCalories: number;

  @ManyToOne(() => Organization, (organization) => organization.profiles)
  organization: Organization;
}
