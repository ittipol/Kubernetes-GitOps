import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entity/category.entity'
import { ItemToCategoryEntity } from './entity/itemToCategory.entity'
// import { ItemEntity } from './../items/entity/item.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ItemToCategoryEntity])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
