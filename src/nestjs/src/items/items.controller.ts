import { Controller, Body, Post, Get, Param, ParseIntPipe, Res, HttpStatus, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemEntity } from './entity/item.entity';
import { CreateItemDto } from './dto/CreateItemDto';
import { ResultEntity } from '../common/entity/ResultEntity';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}    

    @Post()
    insert(@Body() createItemDto: CreateItemDto) {

    }

    // @Get('detail/:id')
    // async detail(@Res() response, @Param('id', ParseIntPipe) id: number): Promise<ItemEntity> {
    //     try{
    //         const item = await this.itemsService.detail(id);            
    //         return response.status(HttpStatus.OK).json(item);
    //     }
    //     catch(ex)
    //     {
    //         return response.status(HttpStatus.BAD_REQUEST).json('BAD REQUEST');
    //     }
        
    // }

    @Get('detail/:slug')
    async detail(@Res() response, @Param('slug') slug: string): Promise<ItemEntity> {
        try{
            const item = await this.itemsService.getDetailBySlug(slug);            
            return response.status(HttpStatus.OK).json(item);
        }
        catch(ex)
        {
            return response.status(HttpStatus.BAD_REQUEST).json('BAD REQUEST');
        }
        
    }

    @Get('list')
    // async lists(@Res() response, @Query('page') page: number, @Query() query) {
        async lists(@Res() response, @Query() query) {        
                    
        const { page, ...searchTerm } = query; 
        console.log('########################')
        console.log(typeof searchTerm.keyword === 'undefined')
        console.log(searchTerm.keyword === undefined)

        try
        {
            const list = await this.itemsService.list(page, searchTerm);
            return response.status(HttpStatus.OK).json(list);
        }
        catch(ex)
        {
            // return response.status(HttpStatus.BAD_REQUEST).json('BAD REQUEST');
            return response.status(HttpStatus.BAD_REQUEST).json(ex);
        }

    }

    @Get('result/:slug')
    async result(@Res() response, @Param('slug') slug: string): Promise<ItemEntity> {

        let result = new ResultEntity();

        try{
            const item = await this.itemsService.getDetailBySlug(slug);            

            if(item == null) {
                result.setError("E4000")
            }else {
                result.setData(item)
            }
            

            return response.status(HttpStatus.OK).json(result.result());
        }
        catch(ex)
        {
            return response.status(HttpStatus.BAD_REQUEST).json('BAD REQUEST');
        }
        
    }    
}
