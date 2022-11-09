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
exports.ArticalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swaggerconfig_1 = require("../config/swaggerconfig");
const artical_service_1 = require("./artical.service");
const create_artical_dto_1 = require("./dto/create-artical.dto");
const update_artical_dto_1 = require("./dto/update-artical.dto");
let ArticalController = class ArticalController {
    constructor(articalService) {
        this.articalService = articalService;
    }
    create(createArticalDto) {
        return this.articalService.create(createArticalDto);
    }
    findAll() {
        return this.articalService.findAll();
    }
    findOne(id) {
        return this.articalService.findOne(+id);
    }
    update(id, updateArticalDto) {
        return this.articalService.update(+id, updateArticalDto);
    }
    remove(id) {
        return this.articalService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_artical_dto_1.CreateArticalDto]),
    __metadata("design:returntype", void 0)
], ArticalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_artical_dto_1.UpdateArticalDto]),
    __metadata("design:returntype", void 0)
], ArticalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticalController.prototype, "remove", null);
ArticalController = __decorate([
    (0, swagger_1.ApiTags)(swaggerconfig_1.swaggerTags.artical),
    (0, common_1.Controller)('artical'),
    __metadata("design:paramtypes", [artical_service_1.ArticalService])
], ArticalController);
exports.ArticalController = ArticalController;
//# sourceMappingURL=artical.controller.js.map