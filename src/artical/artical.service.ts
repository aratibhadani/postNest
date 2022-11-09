import { Injectable } from '@nestjs/common';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';

@Injectable()
export class ArticalService {
  create(createArticalDto: CreateArticalDto) {
    return 'This action adds a new artical';
  }

  findAll() {
    return `This action returns all artical`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artical`;
  }

  update(id: number, updateArticalDto: UpdateArticalDto) {
    return `This action updates a #${id} artical`;
  }

  remove(id: number) {
    return `This action removes a #${id} artical`;
  }
}
