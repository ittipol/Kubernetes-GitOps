import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity/user.entity';
import { jwtConstants } from './../auth/constants';
// import { JwtStrategy } from './../auth/jwt.strategy';
import { AccessTokenStrategy } from './../auth/strategies/accessToken.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({ 
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    ConfigModule 
  ],
  providers: [UsersService, AccessTokenStrategy],
  controllers: [UsersController]
})
export class UsersModule {}
