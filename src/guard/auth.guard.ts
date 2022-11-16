import { CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { tokenCheckInDatabase, verifyToken } from "src/helper/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const user_token = request.headers.authorization;
        const cookieTokenCheck=request.cookies[process.env.COOKIE_NAME];
        console.log('key->',process.env.LOGIN_SECRET_KEY)

        if (!user_token || !cookieTokenCheck ) {
            response.status(400).json({
                message: 'Token not Get..',
                error: true
            });
            return false;
        } else {
            var data_res = false;

            const token = user_token.split(' ')[1];
            //token check
            verifyToken(
                token,
                async (err, decoded) => {
                    if (decoded) {
                        data_res = true;
                        request.user=decoded;
                    } else {
                        response.status(400).json({
                            message: 'Unauthorized Token..',
                            error: true
                        });
                        data_res = false;
                    }
                }
            );
            return data_res;

        }


    }
}