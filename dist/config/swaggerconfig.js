"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerTags = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerTags = {
    user: 'user',
    root: '',
    auth: 'auth',
    post: 'post',
    artical: 'artical',
};
exports.swaggerTags = swaggerTags;
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('post artical example')
    .setDescription('The Post API...')
    .addBearerAuth({
    description: `Please enter token in following`,
    name: 'Authorization',
    bearerFormat: 'Bearer',
    scheme: 'Bearer',
    type: 'http',
    in: 'Header',
}, 'authorization')
    .setVersion('1.0')
    .addTag(swaggerTags.user)
    .build();
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swaggerconfig.js.map