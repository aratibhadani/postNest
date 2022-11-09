"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticalModule = void 0;
const common_1 = require("@nestjs/common");
const artical_service_1 = require("./artical.service");
const artical_controller_1 = require("./artical.controller");
let ArticalModule = class ArticalModule {
};
ArticalModule = __decorate([
    (0, common_1.Module)({
        controllers: [artical_controller_1.ArticalController],
        providers: [artical_service_1.ArticalService]
    })
], ArticalModule);
exports.ArticalModule = ArticalModule;
//# sourceMappingURL=artical.module.js.map