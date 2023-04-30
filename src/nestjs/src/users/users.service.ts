import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { jwtConstants } from './../auth/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
      ) {}

    async getUser(id: number): Promise<UserEntity>{
        // return await this.userRepository.find().then((res)=>{
        //     return res;
        // });

        try
        {
            // throw new UnauthorizedException();
            
            return await this.userRepository.findOneBy({ id });
        }
        catch
        {
            console.log('ERROR...');
            throw new UnauthorizedException();
        }        
        
    }

    async login(username: string, password: string): Promise<any>  {

        try {

            const user = await this.userRepository.findOne({
                where: {
                    email: username
                }
            });

            await bcrypt.compare(password, user.password, function(err, result) {
                console.log(result)
                if (result) {
                   // password is valid
               }
            });            

            if(user) 
            {
                const payload = { username: username, sub: "user" };
    
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            else 
            {
                throw new UnauthorizedException();
            }
            
        }
        catch(ex) 
        {
            throw new UnauthorizedException();
        }
    }

    async profile(jwt: string): Promise<any> {

        try
        {
            // console.log(jwt)
            const token = jwt.split(" ")[1];
// console.log(token)
            if(!token) {
                console.log('error')
                throw {};
            }
            
            const data = this.jwtService.verify(token, {
                secret: jwtConstants.secret
            });

            console.log(data)

            const user = await this.userRepository.findOne({
                where: {
                    email: data.username
                }
            });

            console.log(user)

            delete user.password;
            delete user.createdAt;
            delete user.updated_at;

            return user;
        }
        catch(ex)
        {
            console.log(ex)
            throw new UnauthorizedException();
        }
    }

    async validate(jwt: string): Promise<any> {
        var valid = false;

        try
        {
            const token = jwt.split(" ")[1];
            
            if(!token) {
                console.log('token error!!!!!!')
                throw {};
            }
            // console.log(token)
            const data = this.jwtService.verify(token, {
                secret: jwtConstants.secret
            });

            valid = true;
        }
        catch(ex)
        {
            console.log(ex.message)
            // throw new UnauthorizedException();
        }

        return valid;
    }
}
