import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
export declare class ArticalController {
    private readonly articalService;
    constructor(articalService: ArticalService);
    create(createArticalDto: CreateArticalDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateArticalDto: UpdateArticalDto): string;
    remove(id: string): string;
}
