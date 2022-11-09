import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(body: LoginDTO, response: Response): void;
    checkRoute(): string;
}
