"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = exports.tokenCheckInDatabase = exports.verifyToken = exports.generateToken = void 0;
const Jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const saltRound = 10;
async function generateToken(payload) {
    return new Promise(async (resolve, reject) => {
        const token = await Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        resolve(token);
    });
}
exports.generateToken = generateToken;
async function verifyToken(token, callback) {
    try {
        return Jwt.verify(token, process.env.JWT_SECRET_KEY, {}, callback);
    }
    catch (err) {
        return 'error';
    }
}
exports.verifyToken = verifyToken;
async function tokenCheckInDatabase(userId, token) {
    return await (0, typeorm_1.getRepository)(user_entity_1.UserEntity).findOne({
        where: {
            id: userId,
            login_token: token,
        },
    });
}
exports.tokenCheckInDatabase = tokenCheckInDatabase;
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