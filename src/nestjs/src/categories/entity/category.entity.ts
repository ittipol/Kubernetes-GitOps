import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, MissingDeleteDateColumnError } from 'typeorm';

@Entity ({ name: 'categories'})
export class CategoryEntity{

    @PrimaryGeneratedColumn() id: number;
    
    @Column({name: 'name', type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    slug: string;

    // @Column({type: 'tinyint'})
    @Column()
    active: boolean;

}