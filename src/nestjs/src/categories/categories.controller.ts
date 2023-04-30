import { Controller, Get, Param, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entity/category.entity'
import { ItemToCategoryEntity } from './entity/itemToCategory.entity'
import { get } from 'http';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    // @Get()
    // async all(@Res() response): Promise<CategoryEntity[]> {
    //     // const categories = await this.categoriesService.getAll();

    //     // return response.status(HttpStatus.OK).json({
    //     //     categories
    //     // });

    //     return await this.categoriesService.getAll();
    // }

    @Get()
    async list(@Res() response): Promise<CategoryEntity[]> {
        const categories = await this.categoriesService.getAll();

        return response.status(HttpStatus.OK).json(categories);
    }
    
    @Get('item/:id')
    async getIById(@Param('id', ParseIntPipe) id: number): Promise<ItemToCategoryEntity[]> {
        return await this.categoriesService.getIById(id);
    }
}
