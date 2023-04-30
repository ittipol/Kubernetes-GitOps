import { Controller, Get, Param, ParseIntPipe, ParseFloatPipe, Post, Body, Res, Request, UseGuards, HttpStatus, HttpException, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { UserLoginDto } from './dto/userLoginDto';
// import { response } from 'express';
import * as bcrypt from 'bcrypt';
import { AccessTokenGuard } from './../common/guards/accessToken.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('login2')
    async login2(@Request() req, @Res() res, @Body() userLoginDto: UserLoginDto): Promise<any> {

        const saltOrRounds = 12;

        console.log(req.body.username);
        console.log('================================');
        // console.log(userLoginDto);

        const hashedPassword = await bcrypt.hash(req.body.password, saltOrRounds);
        // console.log(hashedPassword);

        

        const jwt = await this.userService.login(req.body.username, hashedPassword);

        return res.status(HttpStatus.OK).json(jwt);
    } 

    @UseGuards(AccessTokenGuard)
    @Get('profile')
    // @SetMetadata('roles', ['admin'])
    async profile(@Headers() headers): Promise<any> {

        // console.log(headers.authorization)

        const d = new Date()
        console.log('========================================================================================================================================================================')
        console.log('==================================================================================== GET Profile    ' + d.toLocaleString())
        console.log('========================================================================================================================================================================')
        console.log(headers)
        
        try
        {
            return await this.userService.profile(headers.authorization);
        }
        catch
        {
            throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }

        
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('validate')
    // @SetMetadata('roles', ['admin'])    
    async validate(@Res() res, @Headers() headers): Promise<any> {
    
        try
        {
            console.log('*********************************************************')
            console.log(headers)
            const data = await this.userService.validate(headers.authorization);

            return res.status(HttpStatus.OK).json({
                valid: data
            });
        }
        catch(ex)
        {
            // throw ex;
            throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }        
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')    
    // @Roles('admin')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {    

        try
        {
            return await this.userService.getUser(id);
        }
        catch
        {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }            
    }
    
}
