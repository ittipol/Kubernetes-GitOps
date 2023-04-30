import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserEntity } from './users/user.entity/user.entity';
// import { CategoryEntity } from './categories/entity/category.entity';
// import { ItemToCategoryEntity } from './categories/entity/itemToCategory.entity';
// import { ItemEntity } from './items/entity/item.entity';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      envFilePath: process.env.NODE_ENV ? [`.env.${process.env.NODE_ENV}`] : ['.env'],
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      // if use docker => set env via Dockerfile
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [UserEntity, CategoryEntity, ItemToCategoryEntity, ItemEntity],
      // entities: ["/**/*.entity{.ts,.js}"],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    UsersModule,
    CategoriesModule,
    ItemsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
