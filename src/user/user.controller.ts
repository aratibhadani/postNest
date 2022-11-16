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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import { GetUser } from 'src/helper/get-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags(swaggerTags.user)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('add')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto, @Res() response: Response): Promise<any> {
    /*
    Api Endpoint :user/add
    parameter :firstname,lastname,email,contactno,isactive,password
    */
    const resObj= await this.userService.createUser(body);
    if (resObj.error) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: resObj.message,
        data: resObj.data,
        error: resObj.error
      })
    } else {
      return response.status(HttpStatus.OK).send({
        message: resObj.message,
        data: resObj.data,
        error: resObj.error
      })
    }
  }

  @Get()
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  findAll(
    @Query() query: PaginationParamsDTO,
    @Res() response: Response,
  ) {
      return this.userService.findAllUser(query,response);
  }

  @Get(':id')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  findOne(
    @Param('id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Res() response: Response,
  ) {
    return this.userService.findOneUserById(+id,response);
  }

  @Put(':id')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response) {
    return this.userService.updateUser(+id, updateUserDto,response);
  }

  @Delete(':id')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    return this.userService.removeUser(+id, response);
  }
}
