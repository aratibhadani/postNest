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
  ParseIntPipe,
  Put,
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
  findAll(@Res() response: Response) {
    return this.postService.findAllPost(response);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() response: Response,
  ) {
    const resObj = await this.postService.findOne(+id);
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

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
      }),
    }),
  )
  async update(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updatePostDto: CreatePostDto,
    @Res() response: Response
  ): Promise<any> {
    if (file.length == 0) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'file is required',
        data: null,
        error: true,
      });
    }
    const resObj = await this.postService.updatePost(+id, updatePostDto, file);
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

  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Res() response: Response
  ): Promise<any> {
    const resObj = await this.postService.removePost(+id);
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
}
