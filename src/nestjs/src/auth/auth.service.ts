import { BadRequestException, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { UserEntity } from './../users/user.entity/user.entity';
import { jwtConstants } from './../auth/constants';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import * as setCookie from 'set-cookie-parser'

@Injectable()
export class AuthService {

    private readonly user = {
        id: "1",
        username: "test@hotmail.com"
    }

  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    // private configService: ConfigService,
  ) {}

	async signIn(data: AuthDto) {
        try
        {
            // Check if user exists
            // const user = await this.usersService.findByUsername(data.username);
            // if (!user) throw new BadRequestException('User does not exist');
            // const passwordMatches = await argon2.verify(user.password, data.password);
            // if (!passwordMatches)
            // throw new BadRequestException('Password is incorrect');

            console.log(data)

            const user = await this.userRepository.findOne({
                where: {
                    email: data.emailAddress
                }
            });
                        
            if(data.emailAddress != this.user.username || data.password != "1111") {
                console.log('User does not exist')
                throw new BadRequestException('User does not exist');
            }            
            
            const tokens = await this.getTokens(this.user.id, this.user.username);
            // await this.updateRefreshToken(user._id, tokens.refreshToken);
            return tokens;
        }
        catch(ex)
        {
            console.log(ex)
            throw ex;
            // throw new UnauthorizedException();
        }
    }

    async refreshTokens(userId: string, cookie: string) {
        try
        {
            // const user = await this.usersService.findById(userId);
            // if (!user || !user.refreshToken)
            //   throw new ForbiddenException('Access Denied');
            // const refreshTokenMatches = await argon2.verify(
            //   user.refreshToken,
            //   refreshToken,
            // );
            // if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');                
            
            // const token = cookie.split(" ")[1];

            const token = this.getRefreshTokenFromCookie(cookie)
            console.log(token)

            // check refresh token is matched with current refresh token in user table
            //
            
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.JWT_REFRESH_SECRET
            });

            console.log(decoded)

            const tokens = await this.getTokens(this.user.id, this.user.username);
            // await this.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        }
        catch(ex)
        {
            console.log(ex)
            throw new BadRequestException();
            // throw new HttpException('message', HttpStatus.BAD_REQUEST)
        }
    }

    async validate(cookie: string): Promise<string> {

        try
        {
            const token = this.getRefreshTokenFromCookie(cookie)

            const decoded = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.JWT_REFRESH_SECRET
            });

            return 'OK'
        }
        catch
        {
            throw new UnauthorizedException();
        }

    }

	async logout(userId: string) {
        // return this.usersService.update(userId, { refreshToken: null });
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: jwtConstants.JWT_ACCESS_SECRET,
                    expiresIn: '10s',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: jwtConstants.JWT_REFRESH_SECRET,
                    expiresIn: '14m',
                },
            ),
        ]);

        // save latest new refresh token to user table
        //

        return {
            accessToken,
            refreshToken,
        };
    }

    private getRefreshTokenFromCookie(cookie: string): string {

        // reg ex
        const regex = /refresh-token\s*=\s*(\S+)/gm;

        let m;
        let token: string = ''

        while ((m = regex.exec(cookie)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match:string, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                token = match
            });
        }

        return token

    }
}