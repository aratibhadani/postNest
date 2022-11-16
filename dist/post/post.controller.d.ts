/// <reference types="multer" />
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(file: Array<Express.Multer.File>, body: CreatePostDto, response: Response, user: any): Promise<any>;
    findAll(query: PaginationParamsDTO, response: Response): Promise<void>;
    findOne(id: number, response: Response): Promise<Response<any, Record<string, any>>>;
    update(file: Array<Express.Multer.File>, id: number, updatePostDto: CreatePostDto, response: Response): Promise<any>;
    remove(id: number, response: Response): Promise<any>;
}
