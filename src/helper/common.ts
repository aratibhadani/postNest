import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
const saltRound = 10;
export function encryptPassword(password) {
  return new Promise(async (resolve, reject) => {
    await bcrypt.hash(password, saltRound, (err, hashpwd) => {
      if (err) {
        reject();
      } else {
        resolve(hashpwd);
      }
    });
  });
}

export function verifyPassword(plainPassword, dbpassword) {
  return new Promise(async (resolve, reject) => {
    await bcrypt.compare(plainPassword, dbpassword, (err, result) => {
      if (err) {
        reject(false);
      } else if (!result) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}
