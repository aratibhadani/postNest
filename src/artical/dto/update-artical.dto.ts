import { PartialType } from '@nestjs/swagger';
import { CreateArticalDto } from './create-artical.dto';

export class UpdateArticalDto extends PartialType(CreateArticalDto) {}
