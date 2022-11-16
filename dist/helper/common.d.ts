import { UserEntity } from 'src/entities/user.entity';
export declare function generateToken(payload: any): Promise<unknown>;
export declare function verifyToken(token: string, callback: any): Promise<any>;
export declare function tokenCheckInDatabase(userId: number, token: string): Promise<UserEntity>;
export declare function encryptPassword(password: any): Promise<unknown>;
export declare function verifyPassword(plainPassword: any, dbpassword: any): Promise<unknown>;
