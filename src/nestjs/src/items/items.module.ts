import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemEntity } from './entity/item.entity';
import { ItemToCategoryEntity } from '../categories/entity/itemToCategory.entity';
import { CategoryEntity } from '../categories/entity/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity, ItemToCategoryEntity, CategoryEntity])
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
