import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('env')
  async env(@Res() response): Promise<any> {
    return response.status(HttpStatus.OK).json(process.env.NODE_ENV);
  }

  @Get('health')
  async env2(@Res() response): Promise<string> {
    console.log(`env ${process.env.NODE_ENV}`)
    return response.status(HttpStatus.OK).json("OK");
  }
}
