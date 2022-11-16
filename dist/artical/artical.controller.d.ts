/// <reference types="multer" />
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { Response } from 'express';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
export declare class ArticalController {
    private readonly articalService;
    constructor(articalService: ArticalService);
    create(file: Array<Express.Multer.File>, body: CreateArticalDto, response: Response, user: any): Promise<any>;
    findAll(query: PaginationParamsDTO, response: Response): Promise<void>;
    findOne(id: number, response: Response): Promise<Response<any, Record<string, any>>>;
    update(file: Array<Express.Multer.File>, id: number, updatePostDto: CreateArticalDto, response: Response): Promise<any>;
    remove(id: number, response: Response): Promise<any>;
}
