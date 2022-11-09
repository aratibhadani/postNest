import { UserEntity } from 'src/entities/user.entity';
export declare class UserService {
    createUser(body: any, Response: any): Promise<any>;
    findAllUser(Response: any): void;
    findOneUserById(id: number, Response: any): Promise<void>;
    removeUser(id: number, Response: any): Promise<void>;
    userExist(fieldValue: any, userField: string): Promise<UserEntity>;
}
