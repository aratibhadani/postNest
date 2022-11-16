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
  Query,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetUser } from 'src/helper/get-user.decorator';
import { imageFileFilter } from 'src/helper/validation.helper';

@ApiTags(swaggerTags.post)
@UseGuards(AuthGuard)
@Controller('post')
@ApiBearerAuth('authorization')
export class PostController {
  constructor(private readonly postService: PostService) { }


  //for creating post
  @Post('add')
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/post/',
      }),
      fileFilter:imageFileFilter
    }),
  )
  async create(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() body: CreatePostDto,
    @Res() response: Response,
    @GetUser() user: any,
  ): Promise<any> {
    if (file.length == 0) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'file is required',
        data: null,
        error: true,
      });
    }
    const resObj = await this.postService.createPost(file, body, user.id);
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
    @Query() query: PaginationParamsDTO,
    @Res() response: Response) {
    return this.postService.findAllPost(query, response);
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
        destination: './uploads/post/',
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
