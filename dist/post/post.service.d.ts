import { PostEntity } from 'src/entities/post.entity';
import { Connection } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from 'src/user/user.service';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
export declare class PostService {
    private connection;
    private readonly userService;
    constructor(connection: Connection, userService: UserService);
    createPost(file: any, body: any, userId: any): Promise<any>;
    checkPostId(postId: number): Promise<PostEntity>;
    findAllPost(query: PaginationParamsDTO, Response: any): Promise<void>;
    findOne(id: number): Promise<any>;
    updatePost(id: number, body: CreatePostDto, file: any): Promise<any>;
    removePost(id: number): Promise<any>;
}
