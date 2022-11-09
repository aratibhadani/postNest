"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCheckInDb = void 0;
class TokenCheckInDb {
    canActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        return true;
    }
}
exports.TokenCheckInDb = TokenCheckInDb;
//# sourceMappingURL=tokencheckindb.guard.js.map