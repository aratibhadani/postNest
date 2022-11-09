"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const common_2 = require("../helper/common");
const typeorm_1 = require("typeorm");
const saltRound = 10;
let UserService = class UserService {
    async createUser(body, Response) {
        const { firstName, lastName, email, contactno, password, isActive } = body;
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        const userCheck = await this.userExist(email, 'email');
        if (userCheck) {
            return Response.status(400).json({
                data: null,
                message: 'User Exists on this Email',
            });
        }
        else {
            const hashPassword = await (0, common_2.encryptPassword)(password);
            user_repo
                .save({
                firstName,
                lastName,
                isActive,
                email,
                password: hashPassword,
                contactno,
            })
                .then((res) => {
                return Response.status(200).json({
                    data: null,
                    message: 'User Created successfully',
                });
            })
                .catch((err) => {
                console.log(err);
            });
        }
    }
    findAllUser(Response) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        user_repo
            .find({})
            .then((res) => {
            Response.status(200).json({
                data: res,
                message: `User Data successfully`,
            });
        })
            .catch((err) => {
            Response.status(500).json({
                data: null,
                message: `Internal server error`,
            });
        });
    }
    async findOneUserById(id, Response) {
        const usercheck = await this.userExist(id, 'id');
        if (usercheck) {
            Response.status(200).json({
                data: usercheck,
                message: 'User Not Found..',
            });
        }
        else {
            Response.status(404).json({ data: null, message: 'User Not Found..' });
        }
    }
    async removeUser(id, Response) {
        const usercheck = await this.userExist(id, 'id');
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        if (usercheck) {
            await user_repo
                .delete({ id })
                .then((res) => {
                Response.status(200).json({
                    data: null,
                    message: `User Deleted successfully`,
                });
            })
                .catch((err) => {
                Response.status(500).json({
                    data: null,
                    message: `Internal server Error`,
                });
            });
        }
        else {
            Response.status(404).json({ data: null, message: 'User Not Found..' });
        }
    }
    async userExist(fieldValue, userField) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        if (userField === 'email') {
            return await user_repo.findOne({
                where: { email: fieldValue },
            });
        }
        else if (userField === 'id') {
            return await user_repo.findOne({
                where: { id: fieldValue },
            });
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map