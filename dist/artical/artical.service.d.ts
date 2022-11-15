import { Connection } from 'typeorm';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UserService } from 'src/user/user.service';
import { ArticalEntity } from 'src/entities/artical.entity';
export declare class ArticalService {
    private connection;
    private readonly userService;
    constructor(connection: Connection, userService: UserService);
    createArtical(file: any, body: any): Promise<any>;
    checkArticalId(articalId: number): Promise<ArticalEntity>;
    findAllArtical(query: any, Response: any): Promise<void>;
    findOne(id: number): Promise<any>;
    updateArtical(id: number, body: CreateArticalDto, file: any): Promise<any>;
    removeArtical(id: number): Promise<any>;
}
