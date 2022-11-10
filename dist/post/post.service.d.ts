import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    createPost(file: any, body: any): Promise<any>;
    findAllPost(response: any): Promise<unknown>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
