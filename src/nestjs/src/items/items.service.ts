import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ItemEntity } from './entity/item.entity';
import { ItemToCategoryEntity } from '../categories/entity/itemToCategory.entity';
import { CategoryEntity } from '../categories/entity/category.entity'
import { CreateItemDto } from './dto/CreateItemDto';

@Injectable()
export class ItemsService {

    take: number = 24;
    skip: number;

    constructor(
        @InjectRepository(ItemEntity) private readonly itemEntity: Repository<ItemEntity>,
        @InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>,
        @InjectRepository(ItemToCategoryEntity) private readonly itemToCategoryEntity: Repository<ItemToCategoryEntity>
    ) {}

    // async getItems(currentPage: number, take: number = 10): Promise<ItemEntity[]> {

    //     // const _take = 10;

    //     this.skip = (this.take * currentPage) - this.take

    //     return await this.itemEntity.find({ skip: this.skip, take: this.take});
    // }

    insertItems(data: ItemEntity): void{
        this.itemEntity.save(data);
    }

    async detail(id: number): Promise<ItemEntity> {
        const item = await this.itemEntity.findOne({
            where: {
                "id": id
            }
        });

        return item;
    }

    async getDetailBySlug(slug: string): Promise<ItemEntity> {

        // const item = await this.itemEntity.findOne({
        //     where: {
        //         "slug": slug
        //     }
        // });

        return await this.itemEntity.createQueryBuilder('item')
            .innerJoinAndMapMany('item.itemToCategory', ItemToCategoryEntity, 'itemToCategory', 'item.id = itemToCategory.itemId')
            .innerJoinAndMapOne('itemToCategory.category', CategoryEntity, 'category', 'itemToCategory.categoryId = category.id')
            .where('item.slug = :slug', {slug: slug})
            .select([
                'item',
                'itemToCategory.categoryId',
                'category.name'
            ])
            .getOne();
    }

    async list(currentPage: number, searchTerm): Promise<ItemEntity[]> {

        // console.log(currentPage)
        let params = {}
        let whereAnd = [];

        // params = {...params, name: 'test'}
        // params = {...params, title: 'title'}
        // console.log(params)

        if(!currentPage || currentPage < 1) {
            currentPage = 1;
        }      
        
        this.skip = (this.take * currentPage) - this.take

        let query = this.itemEntity.createQueryBuilder('item')
        .innerJoinAndMapMany('item.itemToCategory', ItemToCategoryEntity, 'itemToCategory', 'item.id = itemToCategory.itemId')
        .innerJoinAndMapOne('itemToCategory.category', CategoryEntity, 'category', 'itemToCategory.categoryId = category.id')
        .select([
            // 'item.id',
            // 'item.price',
            // 'item.updatedAt',
            'item',
            'itemToCategory.categoryId',
            'category.name'
        ]);

        if(searchTerm.keyword !== undefined) {
            // query.where('item.title LIKE :title', {title: `%${searchTerm.keyword}%`})

            whereAnd = [...whereAnd, 'item.title LIKE :title']
            params = {...params, title: `%${searchTerm.keyword}%`}
        }

        if(searchTerm.category !== undefined) {            
            // console.log(typeof searchTerm.category)
            // console.log(searchTerm.category)
            // console.log(...searchTerm.category)
            // console.log([...searchTerm.category])
            // query.andWhere('itemToCategory.categoryId IN(:...catagoryIds)', {catagoryIds: JSON.parse(searchTerm.category)})

            try {
                // console.log(typeof JSON.parse(searchTerm.category))

                const _catagoryIds = JSON.parse(searchTerm.category);

                console.log(_catagoryIds.length)

                if(_catagoryIds.length > 0) {
                    whereAnd = [...whereAnd, 'itemToCategory.categoryId IN(:...catagoryIds)']
                    params = {...params, catagoryIds: _catagoryIds}
                }
                
            }
            catch { }            
        }

        if(searchTerm.order !== undefined) {
            
            switch (searchTerm.order) {

                case 'post-date-asc':
                        query.orderBy('item.updatedAt','ASC')
                    break;

                // case 'post-date-desc':
                //         query.orderBy('item.updatedAt','DESC')
                //     break;

                case 'price-asc':
                        query.orderBy('item.price','ASC')
                    break;

                case 'price-desc':
                        query.orderBy('item.price','DESC')
                    break;

                default:
                        query.orderBy('item.updatedAt','DESC')

            }

        }else {
            query.orderBy('item.updatedAt','DESC')
        }        

        // console.log(whereAnd.join(' AND '))
        // console.log(params)
        
        return await query
        .where(whereAnd.join(' AND '))
        .setParameters(params)
        .skip(this.skip)
        .take(this.take)
        .getMany();

        // return await this.itemEntity.createQueryBuilder('item')
        // .innerJoinAndMapMany('item.itemToCategory', ItemToCategoryEntity, 'itemToCategory', 'item.id = itemToCategory.itemId')
        // .innerJoinAndMapOne('itemToCategory.category', CategoryEntity, 'category', 'itemToCategory.categoryId = category.id')
        // // .where('item.id = :id', {id: 1})
        // // .where('item.title LIKE :title', {title: "%โรงแรม%"})
        // .where('item.title LIKE :title')
        // // .where('itemToCategory.categoryId = :id AND item.id = :itemId', {id: 6, itemId: 559})
        // // .andWhere("(photo.name = :photoName OR photo.name = :bearName)")                  
        // .select([
        //     // 'item.id',
        //     // 'item.price',
        //     // 'item.updatedAt',
        //     'item',
        //     'itemToCategory.categoryId',
        //     'category.name'
        // ])
        // .orderBy('item.updatedAt','DESC')
        // .setParameters({ title: "%beach%" })
        // // .setParameters({ photoName: "My", bearName: "Mishka" })
        // .skip(this.skip)
        // .take(this.take)
        // .getMany();
    }

}
