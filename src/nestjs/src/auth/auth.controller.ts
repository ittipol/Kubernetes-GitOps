import { Controller, Post, Get, Body, UseGuards, Req, Res, Headers, Header, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './../common/guards/accessToken.guard';
// import { RefreshTokenGuard } from './../common/guards/refreshToken.guard';
// import { newExpression } from '@babel/types';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    // @Header("x-app-name", "MyApp")
    async signin(@Body() data: AuthDto, @Res() res) {
        const _res = await this.authService.signIn(data);

        console.log(_res.refreshToken)

        // res.cookie('refresh-token', _res.refreshToken, { /*maxAge: 900000,*/ httpOnly: true, secure: true, sameSite: "Lax"});
        res.cookie('refresh-token', _res.refreshToken, { /*maxAge: 900000,*/ httpOnly: true, secure: false, sameSite: "Lax"});
        return res.status(HttpStatus.OK).json(_res);
    }

    // @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Headers() headers, @Res() res) {

        const d = new Date()
        console.log('========================================================================================================================================================================')
        console.log('====================================================================================    ' + d.toLocaleString())
        console.log('========================================================================================================================================================================')
        console.log('[Refresh token service] => Header (Cookie)]')
        console.log(headers.cookie)
        console.log('====================================================================================')

        try
        {
            if(headers.cookie) {
                const _res = await this.authService.refreshTokens("", headers.cookie);

                console.log(_res.refreshToken)

                // res.cookie('refresh-token', _res.refreshToken, { /*maxAge: 900000,*/ httpOnly: true, secure: true});
                res.cookie('refresh-token', _res.refreshToken, { /*maxAge: 900000,*/ httpOnly: true, secure: false, sameSite: "Lax"});
                return res.status(HttpStatus.OK).json(_res);
            }
            else {
                console.log('BadRequestException')
                throw "";
            }
            
        }
        catch
        {
            console.log('FORBIDDEN...')
            return res.status(HttpStatus.FORBIDDEN).json("FORBIDDEN")
        }
    }

    @Get('validate')
    async validate(@Headers() headers, @Res() res) {
        
        
        console.log('======= validater...')
        console.log(headers.cookie)
        console.log('#################')

        try
        {
            if(headers.cookie) {
                const _res = await this.authService.validate(headers.cookie);

                console.log('>>>>> User Validate Success')

                return res.status(HttpStatus.OK).json("OK")
            }
            else {
                console.log('BadRequestException')
                throw "";
            }
            
        }
        catch
        {
            console.log('Validation >>> UNAUTHORIZED')
            return res.status(HttpStatus.UNAUTHORIZED).json("UNAUTHORIZED")
        }
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).send("Log out")
    }

}
