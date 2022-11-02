import { HttpCode, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { encryptPassword } from 'src/helper/common';
import { getRepository } from 'typeorm';

@Injectable()
export class UserService {
  async createUser(body, Response: any): Promise<any> {
    const { firstName, lastName, email, contactno, password, isActive } = body;
    const user_repo = getRepository(UserEntity);

    const userCheck = await this.checkUserByEmail(email);
    if (userCheck) {
      return Response.status(400).json({
        data: null,
        message: 'User Exists on this Email',
      });
    } else {
      const hashPassword: any = await encryptPassword(password);
      user_repo
        .save({
          firstName,
          lastName,
          isActive,
          email,
          password: hashPassword,
          contactno,
        })
        .then((res) => {
          return Response.status(200).json({
            data: null,
            message: 'User Created successfully',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  checkUserByEmail(email: string) {
    const user_repo = getRepository(UserEntity);
    return user_repo.findOne({
      where: {
        email,
        isActive: 1,
      },
    });
  }

  checkUserByUserId(id: number) {
    const user_repo = getRepository(UserEntity);
    return user_repo.findOne({
      where: {
        id,
        isActive: 1,
      },
    });
  }

  findAllUser(Response: any) {
    const user_repo = getRepository(UserEntity);
    user_repo
      .find({})
      .then((res) => {
        if (res.length < 1) {
          Response.status(400).json({
            data: res,
            message: `No User Data available`,
          });
        }
        Response.status(200).json({
          data: res,
          message: `User Data successfully`,
        });
      })
      .catch((err) => {
        Response.status(500).json({
          data: null,
          message: `Internal server error`,
        });
      });
  }

  async findOneUserById(id: number, Response: any) {
    try {
      const usercheck = await this.checkUserByUserId(id);
      if (usercheck) {
        Response.status(200).json({
          data: usercheck,
          message: 'User Data...',
        });
      } else {
        Response.status(404).json({ data: null, message: 'User Not Found..' });
      }
    } catch (error) {
      Response.status(500).json({
        data: null,
        message: 'Internal Server Error',
      });
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async removeUser(id: number, Response: any) {
    const usercheck = await this.checkUserByUserId(id);
    const user_repo = getRepository(UserEntity);
    if (usercheck) {
      await user_repo
        .delete({ id })
        .then((res) => {
          Response.status(200).json({
            data: null,
            message: `User Deleted successfully`,
          });
        })
        .catch((err) => {
          Response.status(500).json({
            data: null,
            message: `Internal server Error`,
          });
        });
    } else {
      Response.status(404).json({ data: null, message: 'User Not Found..' });
    }
  }
}
