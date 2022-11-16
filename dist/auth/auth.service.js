"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../helper/common");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async loginService(reqParam, Response) {
        const { email, password } = reqParam;
        const user = await this.userService.checkUserByEmail(email);
        if (!user) {
            return Response.status(401).send({
                data: null,
                message: 'User Not Found',
            });
        }
        else {
            (0, common_2.verifyPassword)(password, user.password)
                .then(async (is_correctPassword) => {
                if (is_correctPassword) {
                    console.log(user, '->userData');
                    const payload = {
                        id: user.id
                    };
                    const token = await (0, common_2.generateToken)(payload);
                    Response.cookie(process.env.COOKIE_NAME, token);
                    await (0, typeorm_1.getRepository)(user_entity_1.UserEntity)
                        .createQueryBuilder('user')
                        .update()
                        .set({ login_token: token })
                        .where('id = :id', { id: user.id })
                        .execute()
                        .then(() => {
                        Response.status(200).send({
                            data: token,
                            message: 'login successfully...',
                        });
                    })
                        .catch(() => {
                        Response.status(400).send({
                            data: null,
                            message: 'Try to Login again',
                        });
                    });
                }
                else {
                    Response.status(401).send({
                        data: null,
                        message: 'The email and password entered are not valid.',
                    });
                }
            })
                .catch((err) => {
                console.log('user status->', err);
                Response.status(401).send({
                    data: null,
                    message: 'The email and password entered are not valid.',
                });
            });
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map