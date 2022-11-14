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
let PostService = class PostService {
    constructor(connection) {
        this.connection = connection;
    }
    createPost(file, body) {
        return new Promise(async (resolve, reject) => {
            const postRepo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
            const postImageRepo = (0, typeorm_1.getRepository)(post_image_entity_1.PostImageEntity);
            postRepo.save({
                name: body.name,
                content: body.content,
                user: body.userId
            }).then((postData) => {
                console.log(postData);
            }).catch((err) => {
                console.log('error-->', err);
            });
        });
    }
    checkUserId(userId) {
    }
    findAllPost(Response) {
        const post_repo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
        post_repo.createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .select(['post.name', 'post.content', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
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
        return `This action returns a #${id} post`;
    }
    update(id, updatePostDto) {
        return `This action updates a #${id} post`;
    }
    remove(id) {
        return `This action removes a #${id} post`;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map