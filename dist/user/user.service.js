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
let UserService = class UserService {
    async createUser(body, Response) {
        const { firstName, lastName, email, contactno, password, isActive } = body;
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        const userCheck = await this.checkUserByEmail(email);
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
    checkUserByEmail(email) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        return user_repo.findOne({
            where: {
                email,
                isActive: 1,
            },
        });
    }
    checkUserByUserId(id) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        return user_repo.findOne({
            where: {
                id,
                isActive: 1,
            },
        });
    }
    findAllUser(Response) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        user_repo
            .createQueryBuilder('user')
            .select(['user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
            .getMany()
            .then((res) => {
            if (res.length < 1) {
                Response.status(400).json({
                    data: res,
                    message: `No User Data available`,
                });
            }
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
        try {
            const usercheck = await this.checkUserByUserId(id);
            if (usercheck) {
                Response.status(200).json({
                    data: usercheck,
                    message: 'User Data...',
                });
            }
            else {
                Response.status(404).json({ data: null, message: 'User Not Found..' });
            }
        }
        catch (error) {
            Response.status(500).json({
                data: null,
                message: 'Internal Server Error',
            });
        }
    }
    async updateUser(id, body, Response) {
        const usercheck = await this.checkUserByUserId(id);
        if (!usercheck) {
            Response.status(404).json({ data: null, message: 'User Not Found..' });
        }
        else {
            const { firstName, lastName, email, contactno, isActive } = body;
            await (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(user_entity_1.UserEntity)
                .set({ firstName, lastName, email, contactno, isActive })
                .where("id = :id", { id })
                .execute()
                .then(() => {
                Response.status(200).json({ message: 'User Data updated...' });
            })
                .catch((err) => {
                Response.status(400).json({
                    message: 'User Data not updated...',
                });
            });
        }
    }
    async removeUser(id, Response) {
        const usercheck = await this.checkUserByUserId(id);
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
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map