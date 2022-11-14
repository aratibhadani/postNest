import { HttpCode, Injectable } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { encryptPassword } from 'src/helper/common';
import { getConnection, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async createUser(body:CreateUserDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { firstName, lastName, email, contactno, password, isActive } = body;
      const user_repo = getRepository(UserEntity);
  
      const userCheck = await this.checkUserByEmail(email);
      if (userCheck) {
        return resolve({
          data: null,
          message: 'User Exists on this Email',
          error:true
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
            return resolve({
              data: null,
              message: 'User Created successfully',
              error:false
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
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
      .createQueryBuilder('user')
      .select(['user.firstName','user.lastName','user.email','user.isActive'])
      .getMany()
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

  async updateUser(id: number, body: UpdateUserDto, Response: any) {
    const usercheck = await this.checkUserByUserId(id);
    if (!usercheck) {
      Response.status(404).json({ data: null, message: 'User Not Found..' });
    } else {
      const { firstName, lastName, email, contactno, isActive } = body;
      await getConnection()
        .createQueryBuilder()
        .update(UserEntity)
        .set({ firstName, lastName, email, contactno, isActive })
        .where("id = :id", { id })
        .execute()
        .then(()=>{
          Response.status(200).json({message: 'User Data updated...' });
        })
        .catch((err)=>{
          Response.status(400).json({
            message: 'User Data not updated...',
          });
        });
    }
  }

  async removeUser(id: number, Response: any) {
    const usercheck = await this.checkUserByUserId(id);
    const user_repo = getRepository(UserEntity);
    if (usercheck) {
      await user_repo
        .delete({ id })
        .then((res) => {

          // getRepository(UserEntity).delete({id})
          // .then((res)=>{
          //     console.log(res,'responce');

          // })

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
