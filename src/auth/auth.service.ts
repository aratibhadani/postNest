import { ConsoleLogger, Injectable } from '@nestjs/common';
import { generateToken, verifyPassword } from 'src/helper/common';


import { UserService } from 'src/user/user.service';
import { getRepository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

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
            console.log(user, '->userData');

            const payload = {
              id: user.id
            }
            const token: any = await generateToken(payload);
            //token set in cookie
            Response.cookie(process.env.COOKIE_NAME, token)

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


}
