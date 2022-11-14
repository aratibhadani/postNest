import { UpdatePostDto } from './dto/update-post.dto';
import { Connection } from 'typeorm';
export declare class PostService {
    private connection;
    constructor(connection: Connection);
    createPost(file: any, body: any): Promise<any>;
    checkUserId(userId: any): void;
    findAllPost(Response: any): void;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
