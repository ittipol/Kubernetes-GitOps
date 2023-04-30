import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, MissingDeleteDateColumnError } from 'typeorm';
import { ItemToCategoryEntity } from '../../categories/entity/itemToCategory.entity'


@Entity({ name: 'items'})
export class ItemEntity{

  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({ name: 'original_price', type: 'decimal', precision: 15, scale: 2 })
  originalPrice: number;

  @Column({ name: 'created_at', select: false })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(type => ItemToCategoryEntity, itemtoCategory => itemtoCategory.item)
  itemtoCategories: ItemToCategoryEntity[];
}

