import { Entity, Column, OneToMany } from 'typeorm';

import { Profile } from './../users/profiles/profile.entity';
import { BaseEntity } from '../base.entity';
import { User } from 'src/users/user.entity';

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

  @OneToMany(() => Profile, (profile) => profile.organization)
  profiles: User[];
}
