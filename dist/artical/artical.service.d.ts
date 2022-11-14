import { PostEntity } from 'src/entities/post.entity';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateArticalDto } from './dto/create-artical.dto';
export declare class ArticalService {
    private connection;
    constructor(connection: Connection);
    createPost(file: any, body: any): Promise<any>;
    checkUserId(userId: number): Promise<UserEntity[]>;
    checkPostId(postId: number): Promise<PostEntity[]>;
    findAllPost(Response: any): void;
    findOne(id: number): Promise<any>;
    updatePost(id: number, body: CreateArticalDto, file: any): Promise<any>;
    removePost(id: number): Promise<any>;
}
