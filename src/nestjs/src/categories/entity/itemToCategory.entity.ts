import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
// import { CategoryEntity } from './category.entity';
import { ItemEntity } from '../../items/entity/item.entity'


@Entity({ name: 'item_to_categories'})
export class ItemToCategoryEntity {
    
    @PrimaryColumn({ name: 'item_id'})
    itemId: number;

    @PrimaryColumn({ name: 'category_id'})
    categoryId: number;

    @ManyToOne(type => ItemEntity, item => item.itemtoCategories)
    item: ItemEntity;

    // @ManyToMany(() => CategoryEntity, (category) => category.id, {
    //     cascade: true,
    // })
    // @JoinTable()
    // categories: CategoryEntity[]
}