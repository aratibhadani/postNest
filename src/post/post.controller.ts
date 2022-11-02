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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { diskStorage } from 'multer';

@ApiTags(swaggerTags.post)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //for normal senario
  // @Post('single-upload')
  // @UseInterceptors(FileInterceptor('file')) //this name same to upload file time in postman
  // postAdd(@UploadedFile() image: Express.Multer.File) {
  //   console.log(image);
  //   return 'upload single file';
  // }

  //validation to upload multiple field file
  // @Post('single-upload')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'file', maxCount: 1 },
  //     { name: 'file2', maxCount: 2 },
  //   ]),
  // )
  // postAdd(
  //   @UploadedFiles()
  //   image: {
  //     image?: Express.Multer.File[];
  //     image2?: Express.Multer.File[];
  //   },
  // ) {
  //   console.log(image);
  //   return 'upload single file';
  // }

  //multiple file upload
  @Post('multiple-upload')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
      }),
    }),
  )
  postAdd(
    @UploadedFiles()
    image: Array<Express.Multer.File>,
  ) {
    console.log(image);
    return 'upload multiple file';
  }

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postService.create(createPostDto);
  // }

  // @Get()
  // findAll() {
  //   return this.postService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
