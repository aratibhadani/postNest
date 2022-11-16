import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserDto, response: Response): Promise<any>;
    findAll(query: PaginationParamsDTO, response: Response): Promise<void>;
    findOne(id: number, response: Response): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto, response: Response): Promise<void>;
    remove(id: number, response: Response): Promise<void>;
}
