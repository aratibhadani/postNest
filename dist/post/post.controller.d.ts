/// <reference types="multer" />
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    postAdd(image: Array<Express.Multer.File>): string;
}
