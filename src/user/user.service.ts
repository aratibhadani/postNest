import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, isActive, email } = createUserDto;
    const user_repo = getRepository(User);
    const userCheck = await this.userExist(email);
    console.log(userCheck, '->userCheck');
    if (userCheck) {
      return `User Exists on this Email`;
    } else {
      //   await user_repo
      //     .save({
      //       firstName,
      //       lastName,
      //       isActive,
      //     })
      //     .then((res) => {
      //       console.log(res, 'responce');
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
  }

  async userExist(email) {
    const user_repo = getRepository(User);
    return await user_repo.findOne({
      where: { email },
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
