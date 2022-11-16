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
exports.ArticalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const artical_entity_1 = require("../entities/artical.entity");
const artical_image_entity_1 = require("../entities/artical-image.entity");
const pagination_enum_1 = require("../constants/pagination.enum");
let ArticalService = class ArticalService {
    constructor(connection, userService) {
        this.connection = connection;
        this.userService = userService;
    }
    createArtical(file, body, userId) {
        return new Promise(async (resolve, reject) => {
            const userCheck = await this.userService.checkUserByUserId(userId);
            if (!userCheck) {
                return resolve({
                    message: 'User not Found',
                    error: true
                });
            }
            else {
                const articalRepo = (0, typeorm_1.getRepository)(artical_entity_1.ArticalEntity);
                const articalImageRepo = (0, typeorm_1.getRepository)(artical_image_entity_1.ArticalImageEntity);
                articalRepo.save({
                    name: body.name,
                    content: body.content,
                    user: userId
                }).then((articalData) => {
                    console.log(articalData);
                    if (!articalData) {
                        return resolve({
                            message: 'Data not Save..',
                            error: true
                        });
                    }
                    else {
                        file.map((item) => {
                            articalImageRepo.save({
                                image: item.originalname,
                                artical: articalData.id
                            }).then((res) => {
                                console.log('res', res.id);
                            }).catch((err) => {
                                console.log('not save this artical image', err);
                            });
                        });
                        return resolve({
                            message: 'Data Save..',
                            error: false
                        });
                    }
                }).catch((err) => {
                    console.log('error-->', err);
                });
            }
        });
    }
    checkArticalId(articalId) {
        return (0, typeorm_1.getRepository)(artical_entity_1.ArticalEntity).findOne({ where: { id: articalId } });
    }
    async findAllArtical(query, Response) {
        const artical_repo = (0, typeorm_1.getRepository)(artical_entity_1.ArticalEntity);
        const take = query.count != undefined && query.count > 0 ? query.count : pagination_enum_1.default_count;
        const skip = query.page != undefined && query.page > 0 ? (query.page - 1) : 0;
        let builder = artical_repo.createQueryBuilder('artical')
            .leftJoinAndSelect("artical.images", "articalimage")
            .leftJoinAndSelect("artical.user", "user")
            .select(['artical.name', 'artical.content', 'articalimage.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active']);
        if (query.sortby && query.sort) {
            let sortOrder = query.sort ? query.sort.toUpperCase() : pagination_enum_1.default_sort_order;
            if (sortOrder == 'ASC')
                builder = builder.orderBy(`artical.${query.sortby}`, 'ASC');
            else {
                builder = builder.orderBy(`artical.${query.sortby}`, 'DESC');
            }
        }
        else {
            builder = builder.orderBy('artical.createdAt', 'DESC');
        }
        if (query.search) {
            builder = builder.where("artical.name like :name", { name: `%${query.search}%` })
                .orWhere("artical.content like :content", { content: `%${query.search}%` });
        }
        const users = await builder.getMany();
        const total = await builder.getCount();
        Response.status(200).json({
            data: {
                list: users,
                total
            },
            message: `Artical Data successfully`,
        });
    }
    findOne(id) {
        return new Promise((resolve, reject) => {
            const artical_repo = (0, typeorm_1.getRepository)(artical_entity_1.ArticalEntity);
            artical_repo.createQueryBuilder('artical')
                .leftJoinAndSelect("artical.images", "articalimage")
                .leftJoinAndSelect("artical.user", "user")
                .select(['artical.id', 'artical.name', 'artical.content', 'articalimage.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
                .where("artical.id = :articalid", { articalid: id })
                .getOne()
                .then((res) => {
                if (!res) {
                    return resolve({
                        error: true,
                        message: 'Artical Data not Found',
                    });
                }
                else {
                    return resolve({
                        data: res,
                        error: false,
                        message: 'Artical Data get',
                    });
                }
            })
                .catch((err) => {
                return reject({
                    data: null,
                    message: `Internal server error`,
                });
            });
        });
    }
    updateArtical(id, body, file) {
        return new Promise(async (resolve, reject) => {
            const articalExits = await this.checkArticalId(id);
            console.log(articalExits, 'zdsadsa');
            if (!articalExits) {
                return resolve({
                    error: true,
                    message: 'Artical Data not Found',
                });
            }
            else {
                const articalRepo = (0, typeorm_1.getRepository)(artical_entity_1.ArticalEntity);
                articalRepo.createQueryBuilder()
                    .update(artical_entity_1.ArticalEntity)
                    .set({ name: body.name, content: body.content })
                    .where("id = :id", { id })
                    .execute()
                    .then((articalData) => {
                    if (!articalData) {
                        return resolve({
                            message: 'Data not Save..',
                            error: true
                        });
                    }
                    else {
                        const articalImageRepo = (0, typeorm_1.getRepository)(artical_image_entity_1.ArticalImageEntity);
                        file.map((item) => {
                            articalImageRepo.save({
                                image: item.originalname,
                                artical: id
                            }).then((res) => {
                            }).catch((err) => {
                                console.log('not save this artical image', err);
                            });
                        });
                        return resolve({
                            message: 'Data Save..',
                            error: false
                        });
                    }
                })
                    .catch((err) => {
                    console.log(err, 'err');
                });
            }
        });
    }
    removeArtical(id) {
        return new Promise(async (resolve, reject) => {
            const articalExits = await this.checkArticalId(id);
            if (!articalExits) {
                return resolve({
                    error: false,
                    message: 'Artical Data not Found',
                });
            }
            else {
                const articalImageRepo = (0, typeorm_1.getRepository)(artical_image_entity_1.ArticalImageEntity);
                const data = await articalImageRepo.createQueryBuilder('artical_image')
                    .leftJoinAndSelect("artical_image.artical", "artical")
                    .select(['artical_image.id'])
                    .where("artical.id = :articalid", { articalid: id })
                    .getMany();
                const dataArr = data.map(object => object.id);
                console.log(dataArr);
                if (dataArr.length == 0) {
                    return resolve({
                        error: true,
                        message: 'No any ArticalImage available this artical',
                    });
                }
                else {
                    await (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .delete()
                        .from(artical_image_entity_1.ArticalImageEntity)
                        .where("id IN (:...id)", { id: dataArr })
                        .execute()
                        .then(async () => {
                        await (0, typeorm_1.getConnection)().createQueryBuilder()
                            .delete().from(artical_entity_1.ArticalEntity)
                            .where('id=:id', { id: id })
                            .execute();
                        return resolve({
                            error: false,
                            message: 'Artical Data Deleted',
                        });
                    })
                        .catch(() => {
                        return resolve({
                            error: true,
                            message: 'Artical Data not Deleted',
                        });
                    });
                }
            }
        });
    }
};
ArticalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        user_service_1.UserService])
], ArticalService);
exports.ArticalService = ArticalService;
//# sourceMappingURL=artical.service.js.map