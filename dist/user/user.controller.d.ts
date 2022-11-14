import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserDto, response: Response): Promise<any>;
    findAll(page: number, response: Response): void;
    findOne(id: number, response: Response, user: UserEntity): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto, response: Response): Promise<void>;
    remove(id: number, response: Response): Promise<void>;
}
