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
exports.PostImageEntity = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
let PostImageEntity = class PostImageEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], PostImageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 100 }),
    __metadata("design:type", String)
], PostImageEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.PostEntity, (post) => post.images, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "post_id" }),
    __metadata("design:type", Number)
], PostImageEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false }),
    __metadata("design:type", Date)
], PostImageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: false, onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], PostImageEntity.prototype, "updatedAt", void 0);
PostImageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'postimage' })
], PostImageEntity);
exports.PostImageEntity = PostImageEntity;
//# sourceMappingURL=post-image.entity.js.map