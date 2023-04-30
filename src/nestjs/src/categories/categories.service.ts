import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, JoinTable, JoinColumn } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CategoryEntity } from './entity/category.entity'
import { ItemToCategoryEntity } from './entity/itemToCategory.entity'
import { ItemEntity } from './../items/entity/item.entity'

@Injectable({ scope: Scope.REQUEST})
export class CategoriesService {

    constructor(
        @Inject(REQUEST) private request: Request,
        @InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>,
        @InjectRepository(ItemToCategoryEntity) private readonly itemToCategoryEntity: Repository<ItemToCategoryEntity>
    ) {}

    async getAll(): Promise<CategoryEntity[]> {
        
        // await this.categoryEntity.find().then((res) => {
        //     // console.log(res.);
        // });

        return await this.categoryEntity.find();
    }

    async getIById(categoryId: number): Promise<ItemToCategoryEntity[]> {

        // return await this.itemToCategoryEntity.createQueryBuilder('itemToCategoryEntity')
        // .innerJoinAndMapOne('itemToCategoryEntity.category', CategoryEntity, 'category', 'itemToCategoryEntity.category_id = category.id')
        // .where('itemToCategoryEntity.category_id = :id', {id: 6})
        // .getMany();


        return await this.itemToCategoryEntity.createQueryBuilder('itemToCategoryEntity')
        .innerJoinAndMapOne('itemToCategoryEntity.item', ItemEntity, 'item', 'itemToCategoryEntity.item_id = item.id')
        .where('itemToCategoryEntity.category_id = :id', {id: categoryId})     
        .take(10)   
        .getMany();



        // return await this.itemToCategoryEntity.createQueryBuilder('itemToCategoryEntity')
        // .leftJoinAndSelect('itemToCategoryEntity.categories', 'category')
        // .getMany();

        // return await this.itemToCategoryEntity.find({
        //     relations: {
        //         categories: true,
        //     },
        // })
        // return await this.itemToCategoryEntity.findBy({ categoryId: 6});
    }    
}
