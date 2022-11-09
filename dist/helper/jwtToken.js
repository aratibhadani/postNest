"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
async function createJWTToken(payload) {
    console.log(jsonwebtoken_1.default.sign({ id: 6 }, '12345'));
    try {
    }
    catch (error) {
        return error;
    }
}
exports.createJWTToken = createJWTToken;
//# sourceMappingURL=jwtToken.js.map