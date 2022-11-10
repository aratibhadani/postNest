import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { diskStorage } from 'multer';
import { Response } from 'express';

@ApiTags(swaggerTags.post)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('add')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
      }),
    }),
  )
  async create(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() body: CreatePostDto,
    @Res() response: Response): Promise<any> {
    console.log(file)
    if (file.length == 0) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'file is required',
        data: null,
        error: true,
      });
    }
    const resObj = await this.postService.createPost(file, body);
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
  findAll(
    //set default value in query param
    // @Query('page', new DefaultValuePipe(0)) page: number,
    @Res() response: Response,
  ) {
    return this.postService.findAllPost(response);
  }

  // @Get(':id')
  // findOne(
  //   @Param(
  //     'id',
  //     //normal case @Param('id',ParseIntPipe) id :number)
  //     //set custome status code
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  //   @Res() response: Response,
  //   @GetUser() user: UserEntity,
  // ) {
  //   console.log(user, 'user');
  //   return this.userService.findOneUserById(+id, response);
  // }

  // @Put(':id')
  // @UsePipes(new ValidationPipe())
  // update(
  //   @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Res() response: Response) {
  //   return this.userService.updateUser(+id, updateUserDto,response);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
  //   return this.userService.removeUser(+id, response);
  // }
}
