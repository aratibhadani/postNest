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
const pagination_enum_1 = require("../constants/pagination.enum");
const user_entity_1 = require("../entities/user.entity");
const common_2 = require("../helper/common");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    async createUser(body) {
        return new Promise(async (resolve, reject) => {
            const { firstName, lastName, email, contactno, password, isActive } = body;
            const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
            const userCheck = await this.checkUserByEmail(email);
            if (userCheck) {
                return resolve({
                    data: null,
                    message: 'User Exists on this Email',
                    error: true
                });
            }
            else {
                const hashPassword = await (0, common_2.encryptPassword)(password);
                user_repo
                    .save({
                    first_name: firstName,
                    last_name: lastName,
                    is_active: pagination_enum_1.user_status.ACTIVED,
                    email,
                    password: hashPassword,
                    contact_no: contactno,
                })
                    .then((res) => {
                    return resolve({
                        data: null,
                        message: 'User Created successfully',
                        error: false
                    });
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    checkUserByEmail(email) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        return user_repo.findOne({
            where: {
                email,
                is_active: 1,
            },
        });
    }
    checkUserByUserId(id) {
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        return user_repo.findOne({
            where: {
                id,
                is_active: 1,
            },
        });
    }
    async findAllUser(query, Response) {
        const take = query.count != undefined && query.count > 0 ? query.count : pagination_enum_1.default_count;
        const skip = query.page != undefined && query.page > 0 ? (query.page - 1) : 0;
        const user_repo = (0, typeorm_1.getRepository)(user_entity_1.UserEntity);
        let builder = user_repo
            .createQueryBuilder('user')
            .select(['user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
            .take(take)
            .skip(skip);
        if (query.sortby && query.sort) {
            let sortOrder = query.sort ? query.sort.toUpperCase() : pagination_enum_1.default_sort_order;
            if (sortOrder == 'ASC')
                builder = builder.orderBy(`user.${query.sortby}`, 'ASC');
            else {
                builder = builder.orderBy(`user.${query.sortby}`, 'DESC');
            }
        }
        else {
            builder = builder.orderBy('user.createdAt', 'DESC');
        }
        if (query.search) {
            builder = builder.where("user.first_name like :name", { name: `%${query.search}%` })
                .orWhere("user.last_name like :lastname", { lastname: `%${query.search}%` })
                .orWhere("user.email like :email", { email: `%${query.search}%` });
        }
        const users = await builder.getMany();
        const total = await builder.getCount();
        Response.status(200).json({
            data: {
                list: users,
                total
            },
            message: `User Data successfully`,
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
                .set({
                first_name: firstName,
                last_name: lastName, email,
                contact_no: contactno,
                is_active: isActive
            })
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