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
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard('jwt'))
  checkRoute() {
    return 'return data';
  }
}
