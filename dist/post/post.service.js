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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_image_entity_1 = require("../entities/post-image.entity");
const post_entity_1 = require("../entities/post.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let PostService = class PostService {
    constructor(connection) {
        this.connection = connection;
    }
    createPost(file, body) {
        return new Promise(async (resolve, reject) => {
            const userCheck = await this.checkUserId(body.userId);
            if (userCheck.length === 0) {
                return resolve({
                    message: 'User not Found',
                    error: true
                });
            }
            else {
                const postRepo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
                const postImageRepo = (0, typeorm_1.getRepository)(post_image_entity_1.PostImageEntity);
                postRepo.save({
                    name: body.name,
                    content: body.content,
                    user: body.userId
                }).then((postData) => {
                    console.log(postData);
                    if (!postData) {
                        return resolve({
                            message: 'Data not Save..',
                            error: true
                        });
                    }
                    else {
                        file.map((item) => {
                            postImageRepo.save({
                                image: item.originalname,
                                post: postData.id
                            }).then((res) => {
                                console.log('res', res.id);
                            }).catch((err) => {
                                console.log('not save this post image', err);
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
    checkUserId(userId) {
        return (0, typeorm_1.getRepository)(user_entity_1.UserEntity).find({ where: { id: userId } });
    }
    checkPostId(postId) {
        return (0, typeorm_1.getRepository)(post_entity_1.PostEntity).find({ where: { id: postId } });
    }
    findAllPost(Response) {
        const post_repo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
        post_repo.createQueryBuilder('post')
            .leftJoinAndSelect("post.images", "postimage")
            .leftJoinAndSelect("post.user", "user")
            .select(['post.name', 'post.content', 'postimage.image', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
            .getMany()
            .then((res) => {
            if (res.length == 0) {
                return Response.status(common_1.HttpStatus.NOT_FOUND).send({
                    data: null,
                    message: 'Post Data not Found',
                });
            }
            else {
                return Response.status(common_1.HttpStatus.OK).send({
                    data: res,
                    message: 'Post Data get',
                });
            }
        })
            .catch((err) => {
            Response.status(500).json({
                data: null,
                message: `Internal server error`,
            });
        });
    }
    findOne(id) {
        return new Promise((resolve, reject) => {
            const post_repo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
            post_repo.createQueryBuilder('post')
                .leftJoinAndSelect("post.images", "postimage")
                .leftJoinAndSelect("post.user", "user")
                .select(['post.name', 'post.content', 'postimage.image', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
                .getMany()
                .then((res) => {
                if (res.length == 0) {
                    return resolve({
                        error: true,
                        message: 'Post Data not Found',
                    });
                }
                else {
                    return resolve({
                        data: res,
                        error: false,
                        message: 'Post Data get',
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
    updatePost(id, body, file) {
        return new Promise(async (resolve, reject) => {
            const postExits = await this.checkPostId(id);
            if (!postExits) {
                return resolve({
                    error: true,
                    message: 'Post Data not Found',
                });
            }
            else {
                const postRepo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
                postRepo.createQueryBuilder()
                    .update(post_entity_1.PostEntity)
                    .set({ name: body.name, content: body.content })
                    .where("id = :id", { id })
                    .execute()
                    .then((postData) => {
                    if (!postData) {
                        return resolve({
                            message: 'Data not Save..',
                            error: true
                        });
                    }
                    else {
                        const postImageRepo = (0, typeorm_1.getRepository)(post_image_entity_1.PostImageEntity);
                        file.map((item) => {
                            postImageRepo.save({
                                image: item.originalname,
                                post: id
                            }).then((res) => {
                            }).catch((err) => {
                                console.log('not save this post image', err);
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
    removePost(id) {
        return new Promise(async (resolve, reject) => {
            const postExits = await this.checkPostId(id);
            if (postExits.length === 0) {
                return resolve({
                    error: false,
                    message: 'Post Data not Found',
                });
            }
            else {
                const postImageRepo = (0, typeorm_1.getRepository)(post_image_entity_1.PostImageEntity);
                const data = await postImageRepo.createQueryBuilder('post_image')
                    .leftJoinAndSelect("post_image.post", "post")
                    .select(['post_image.id'])
                    .where("post.id = :postid", { postid: id })
                    .getMany();
                const dataArr = data.map(object => object.id);
                console.log(dataArr);
                if (dataArr.length == 0) {
                    return resolve({
                        error: true,
                        message: 'No any PostImage available this post',
                    });
                }
                else {
                    await (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .delete()
                        .from(post_image_entity_1.PostImageEntity)
                        .where("id IN (:...id)", { id: dataArr })
                        .execute()
                        .then(async () => {
                        await (0, typeorm_1.getConnection)().createQueryBuilder()
                            .delete().from(post_entity_1.PostEntity)
                            .where('id=:id', { id: id })
                            .execute();
                        return resolve({
                            error: false,
                            message: 'Post Data Deleted',
                        });
                    })
                        .catch(() => {
                        return resolve({
                            error: true,
                            message: 'Post Data not Deleted',
                        });
                    });
                }
            }
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map