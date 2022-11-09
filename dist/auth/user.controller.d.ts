import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserDto, response: Response): any;
    findAll(response: Response): void;
    findOne(id: number, response: Response): Promise<void>;
    remove(id: number, response: Response): Promise<void>;
    loginUser(): string;
}
