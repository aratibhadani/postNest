import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
export declare class ArticalService {
    create(createArticalDto: CreateArticalDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateArticalDto: UpdateArticalDto): string;
    remove(id: number): string;
}
