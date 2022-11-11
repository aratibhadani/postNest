"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_image_entity_1 = require("../entities/post-image.entity");
const post_entity_1 = require("../entities/post.entity");
const typeorm_1 = require("typeorm");
let PostService = class PostService {
    createPost(file, body) {
        return new Promise(async (resolve, reject) => {
            const postRepo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
            const postImageRepo = (0, typeorm_1.getRepository)(post_image_entity_1.PostImageEntity);
            postRepo.save({
                name: body.name,
                content: body.content,
                userId: 1
            }).then((postData) => {
            }).catch((err) => {
                console.log('error-->', err);
            });
        });
    }
    findAllPost(response) {
        const post_repo = (0, typeorm_1.getRepository)(post_entity_1.PostEntity);
        return new Promise(async (resolve, reject) => {
            return post_repo.createQueryBuilder('post')
                .leftJoinAndSelect("post.images", "roles")
                .getMany();
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
    (0, common_1.Injectable)()
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map