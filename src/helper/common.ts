const Jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';
const saltRound = 10;
//generate token
export async function generateToken(payload) {
  return new Promise(async (resolve, reject) => {
    const token = await Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    resolve(token);
  });

}

//verify Token 
export async function verifyToken(token: string, callback) {
  try {
    return Jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      {},
      callback
    );
  } catch (err) {
    return 'error';
  }
}

//creating function for check token are present or not in db
export  async function tokenCheckInDatabase(userId:number,token:string){
  return await getRepository(UserEntity).findOne({
    where:
    {
        id: userId,
        login_token: token,
    },
});
}

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
