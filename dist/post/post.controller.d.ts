/// <reference types="multer" />
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(file: Array<Express.Multer.File>, body: CreatePostDto, response: Response): Promise<any>;
    findAll(response: Response): Promise<unknown>;
}
