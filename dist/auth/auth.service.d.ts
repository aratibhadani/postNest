import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    loginService(reqParam: any, Response: any): Promise<any>;
}
