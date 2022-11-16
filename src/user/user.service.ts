import { HttpCode, Injectable } from '@nestjs/common';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
import { default_count, default_sort_order, user_status } from 'src/constants/pagination.enum';
import { UserEntity } from 'src/entities/user.entity';
import { encryptPassword } from 'src/helper/common';
import { getConnection, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async createUser(body: CreateUserDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { firstName, lastName, email, contactno, password, isActive } = body;
      const user_repo = getRepository(UserEntity);

      const userCheck = await this.checkUserByEmail(email);
      if (userCheck) {
        return resolve({
          data: null,
          message: 'User Exists on this Email',
          error: true
        });
      } else {
        const hashPassword: any = await encryptPassword(password);
        user_repo
          .save({
            first_name:firstName,
            last_name:lastName,
            is_active:user_status.ACTIVED,
            email,
            password: hashPassword,
            contact_no:contactno,
          })
          .then((res) => {
            return resolve({
              data: null,
              message: 'User Created successfully',
              error: false
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
        is_active: 1,
      },
    });
  }

  checkUserByUserId(id: number) {
    const user_repo = getRepository(UserEntity);
    return user_repo.findOne({
      where: {
        id,
        is_active: 1,
      },
    });
  }

  async findAllUser(query: PaginationParamsDTO, Response: any) {
    //this set the limit 
    const take = query.count != undefined && query.count > 0 ? query.count : default_count;

    //this set the offset 
    const skip = query.page != undefined && query.page > 0 ? (query.page - 1) : 0;

    const user_repo = getRepository(UserEntity);
    let builder = user_repo
      .createQueryBuilder('user')
      .select(['user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
      .take(take)
      .skip(skip);

    if (query.sortby && query.sort) {
      let sortOrder = query.sort ? query.sort.toUpperCase() : default_sort_order;
      if (sortOrder == 'ASC')
        builder = builder.orderBy(`user.${query.sortby}`, 'ASC')
      else {
        builder = builder.orderBy(`user.${query.sortby}`, 'DESC')
      }
    } else {
      builder = builder.orderBy('user.createdAt', 'DESC')
    }

    if (query.search) {
      builder = builder.where("user.first_name like :name", { name: `%${query.search}%` })
        .orWhere("user.last_name like :lastname", { lastname: `%${query.search}%` })
        .orWhere("user.email like :email", { email: `%${query.search}%` })

    }

    const users = await builder.getMany();
    const total = await builder.getCount()

    Response.status(200).json({
      data: {
        list: users,
        total
      },
      message: `User Data successfully`,
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
        .set({
          first_name: firstName, 
          last_name:lastName, email, 
          contact_no:contactno, 
          is_active:isActive
        })
        .where("id = :id", { id })
        .execute()
        .then(() => {
          Response.status(200).json({ message: 'User Data updated...' });
        })
        .catch((err) => {
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
