"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_artical_dto_1 = require("./create-artical.dto");
class UpdateArticalDto extends (0, swagger_1.PartialType)(create_artical_dto_1.CreateArticalDto) {
}
exports.UpdateArticalDto = UpdateArticalDto;
//# sourceMappingURL=update-artical.dto.js.map