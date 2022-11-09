"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = void 0;
const bcrypt = require("bcrypt");
const saltRound = 10;
function encryptPassword(password) {
    return new Promise(async (resolve, reject) => {
        await bcrypt.hash(password, saltRound, (err, hashpwd) => {
            if (err) {
                reject();
            }
            else {
                resolve(hashpwd);
            }
        });
    });
}
exports.encryptPassword = encryptPassword;
function verifyPassword(plainPassword, dbpassword) {
    return new Promise(async (resolve, reject) => {
        await bcrypt.compare(plainPassword, dbpassword, (err, result) => {
            if (err) {
                reject(false);
            }
            else if (!result) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=common.js.map