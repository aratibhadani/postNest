import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { swaggerTags } from 'src/config/swaggerconfig';
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';

@ApiTags(swaggerTags.artical)
@Controller('artical')
export class ArticalController {
  constructor(private readonly articalService: ArticalService) {}

  @Post()
  create(@Body() createArticalDto: CreateArticalDto) {
    return this.articalService.create(createArticalDto);
  }

  @Get()
  findAll() {
    return this.articalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticalDto: UpdateArticalDto) {
    return this.articalService.update(+id, updateArticalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articalService.remove(+id);
  }
}
