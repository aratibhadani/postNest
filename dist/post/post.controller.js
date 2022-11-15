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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const swaggerconfig_1 = require("../config/swaggerconfig");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const pagination_dto_1 = require("../config/pagination.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(file, body, response) {
        if (file.length == 0) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: 'file is required',
                data: null,
                error: true,
            });
        }
        const resObj = await this.postService.createPost(file, body);
        if (resObj.error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
        else {
            return response.status(common_1.HttpStatus.OK).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
    }
    findAll(query, response) {
        return this.postService.findAllPost(query, response);
    }
    async findOne(id, response) {
        const resObj = await this.postService.findOne(+id);
        if (resObj.error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
        else {
            return response.status(common_1.HttpStatus.OK).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
    }
    async update(file, id, updatePostDto, response) {
        if (file.length == 0) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: 'file is required',
                data: null,
                error: true,
            });
        }
        const resObj = await this.postService.updatePost(+id, updatePostDto, file);
        if (resObj.error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
        else {
            return response.status(common_1.HttpStatus.OK).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
    }
    async remove(id, response) {
        const resObj = await this.postService.removePost(+id);
        if (resObj.error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
        else {
            return response.status(common_1.HttpStatus.OK).send({
                message: resObj.message,
                data: resObj.data,
                error: resObj.error
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/post/',
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationParamsDTO, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/post/',
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)(swaggerconfig_1.swaggerTags.post),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map