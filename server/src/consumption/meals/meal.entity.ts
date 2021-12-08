import { Entity, Column, OneToMany } from 'typeorm';

import { Consumption } from './../consumption.entity';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'meal' })
export class Meal extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  name: string;

  @Column({ type: 'time', nullable: true })
  startTime: Date;

  @Column({ type: 'time', nullable: true })
  endTime: Date;

  @OneToMany(() => Consumption, (consumption) => consumption.meal)
  consumptions: Consumption[];
}
