import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    createUser(body: CreateUserDto, Response: any): Promise<any>;
    checkUserByEmail(email: string): Promise<UserEntity>;
    checkUserByUserId(id: number): Promise<UserEntity>;
    findAllUser(Response: any): void;
    findOneUserById(id: number, Response: any): Promise<void>;
    updateUser(id: number, body: UpdateUserDto, Response: any): Promise<void>;
    removeUser(id: number, Response: any): Promise<void>;
}
