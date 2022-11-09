import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    loginService(reqParam: any, Response: any): Promise<any>;
    createJWTToken(payload: JwtPayload): string;
}
