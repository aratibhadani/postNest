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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import { GetUser } from 'src/helper/get-user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags(swaggerTags.user)
@ApiBearerAuth('authorization')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateUserDto, @Res() response: Response): any {
    /*
    Api Endpoint :user/add
    parameter :firstname,lastname,email,contactno,isactive
    */
    return this.userService.createUser(body, response);
  }

  @Get()
  findAll(
    //set default value in query param
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Res() response: Response,
  ) {
    return this.userService.findAllUser(response);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      //normal case @Param('id',ParseIntPipe) id :number)
      //set custome status code
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() response: Response,
    @GetUser() user: UserEntity,
  ) {
    console.log(user, 'user');
    return this.userService.findOneUserById(+id, response);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    return this.userService.removeUser(+id, response);
  }
}
