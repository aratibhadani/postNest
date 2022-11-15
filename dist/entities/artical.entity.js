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
exports.ArticalEntity = void 0;
const typeorm_1 = require("typeorm");
const artical_image_entity_1 = require("./artical-image.entity");
const user_entity_1 = require("./user.entity");
let ArticalEntity = class ArticalEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], ArticalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: false }),
    __metadata("design:type", String)
], ArticalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ArticalEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.articals, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Number)
], ArticalEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => artical_image_entity_1.ArticalImageEntity, (articalimage) => articalimage.artical),
    __metadata("design:type", Array)
], ArticalEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false }),
    __metadata("design:type", Date)
], ArticalEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: false, onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ArticalEntity.prototype, "updatedAt", void 0);
ArticalEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'artical' })
], ArticalEntity);
exports.ArticalEntity = ArticalEntity;
//# sourceMappingURL=artical.entity.js.map