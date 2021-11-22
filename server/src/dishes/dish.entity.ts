import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'dish' })
export class Dish extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'numeric', nullable: false })
  protein: number;

  @Column({ type: 'numeric', nullable: false })
  fat: number;

  @Column({ type: 'numeric', nullable: false })
  carbohydrates: number;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  calories: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;
}
