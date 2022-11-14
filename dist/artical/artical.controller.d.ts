/// <reference types="multer" />
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { Response } from 'express';
export declare class ArticalController {
    private readonly articalService;
    constructor(articalService: ArticalService);
    create(file: Array<Express.Multer.File>, body: CreateArticalDto, response: Response): Promise<any>;
    findAll(response: Response): void;
    findOne(id: number, response: Response): Promise<Response<any, Record<string, any>>>;
    update(file: Array<Express.Multer.File>, id: number, updatePostDto: CreateArticalDto, response: Response): Promise<any>;
    remove(id: number, response: Response): Promise<any>;
}
