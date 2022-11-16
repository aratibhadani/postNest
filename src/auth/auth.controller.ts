import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Res,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  Query,
  DefaultValuePipe,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetUser } from 'src/helper/get-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';


@ApiTags(swaggerTags.auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  Login(@Body() body: LoginDTO, @Res() response: Response): void {
    const reqParam = body;
    this.authService.loginService(reqParam, response);
  }

  @Get('check')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  checkRoute(
    @GetUser() user: any,
    @Res() response: Response,
  ) {
    console.log(user)
   
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  LogoutRoute(
    @GetUser() user: any,
    @Res() response: Response
  ) {
    
    response.clearCookie(process.env.COOKIE_NAME);
    return response.status(200).json({
      message:"logout Done..",
      error:false
    })
  }
}
