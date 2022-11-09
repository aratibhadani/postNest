import { UserEntity } from 'src/entities/user.entity';
export declare class UserService {
    createUser(body: any, Response: any): Promise<any>;
    checkUserByEmail(email: string): Promise<UserEntity>;
    checkUserByUserId(id: number): Promise<UserEntity>;
    findAllUser(Response: any): void;
    findOneUserById(id: number, Response: any): Promise<void>;
    removeUser(id: number, Response: any): Promise<void>;
}
