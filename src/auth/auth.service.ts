import { Injectable } from '@nestjs/common';
import { verifyPassword } from 'src/helper/common';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtPayload } from './jwt.payload';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async loginService(reqParam, Response) {
    const { email, password } = reqParam;
    const user = await this.userService.checkUserByEmail(email);
    if (!user) {
      return Response.status(401).send({
        data: null,
        message: 'User Not Found',
      });
    } else {
      verifyPassword(password, user.password)
        .then(async (is_correctPassword) => {
          if (is_correctPassword) {
            const token = await this.createJWTToken(user);

            //update logintoken value in DB
            await getRepository(UserEntity)
              .createQueryBuilder('user')
              .update()
              .set({ login_token: token })
              .where('id = :id', { id: user.id })
              .execute()
              .then(() => {
                Response.status(200).send({
                  data: token,
                  message: 'login successfully...',
                });
              })
              .catch(() => {
                Response.status(400).send({
                  data: null,
                  message: 'Try to Login again',
                });
              });
          } else {
            Response.status(401).send({
              data: null,
              message: 'The email and password entered are not valid.',
            });
          }
        })
        .catch((err) => {
          console.log('user status->', err);
          Response.status(401).send({
            data: null,
            message: 'The email and password entered are not valid.',
          });
        });
    }
  }

  //logout service
  // logoutService(){

  // }

  //use for creating jwt token
  createJWTToken(payload: JwtPayload): string {
    return this.jwtService.sign({
      email: payload.email,
      id: payload.id,
    });
  }
}
