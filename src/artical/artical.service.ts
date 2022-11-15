import { HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UserService } from 'src/user/user.service';
import { ArticalEntity } from 'src/entities/artical.entity';
import { ArticalImageEntity } from 'src/entities/artical-image.entity';
import { default_count, default_sort_order } from 'src/constants/pagination.enum';

@Injectable()
export class ArticalService {
  constructor(
    private connection: Connection,
    private readonly userService:UserService
    ) { }

  createArtical(file, body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const userCheck = await this.userService.checkUserByUserId(body.userId);
      if (!userCheck) {
        return resolve({
          message: 'User not Found',
          error: true
        })
      } else {
        const articalRepo = getRepository(ArticalEntity);
        const articalImageRepo = getRepository(ArticalImageEntity);
        articalRepo.save({
          name: body.name,
          content: body.content,
          user: body.userId
        }).then((articalData) => {
          console.log(articalData)
          if (!articalData) {
            return resolve({
              message: 'Data not Save..',
              error: true
            })
          } else {

            file.map((item) => {
              articalImageRepo.save({
                image: item.originalname,
                artical: articalData.id
              }).then((res) => {
                console.log('res', res.id)
              }).catch((err) => {
                console.log('not save this artical image', err)
              })
            })
            return resolve({
              message: 'Data Save..',
              error: false
            })
          }
        }).catch((err) => {
          console.log('error-->', err);
        })
      }

    })
  }


  //check artical id is present or not
  checkArticalId(articalId: number) {
    return getRepository(ArticalEntity).findOne({ where: { id: articalId } });
  }

  //get all artical of related iamges and joimn user data
  async findAllArtical(query,Response) {
    const artical_repo = getRepository(ArticalEntity);
    const take = query.count != undefined && query.count > 0 ? query.count : default_count;
    const skip = query.page != undefined && query.page > 0 ? (query.page - 1) : 0;
    let builder = artical_repo.createQueryBuilder('artical')
      .leftJoinAndSelect("artical.images", "articalimage")
      .leftJoinAndSelect("artical.user", "user")
      .select(['artical.name', 'artical.content', 'articalimage.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
      // .take(take)
      // .skip(skip)

      if (query.sortby && query.sort) {
        let sortOrder = query.sort ? query.sort.toUpperCase() : default_sort_order;
        if (sortOrder == 'ASC')
          builder = builder.orderBy(`artical.${query.sortby}`, 'ASC')
        else {
          builder = builder.orderBy(`artical.${query.sortby}`, 'DESC')
        }
      } else {
        builder = builder.orderBy('artical.createdAt', 'DESC')
      }
  
      if (query.search) {
        builder = builder.where("artical.name like :name", { name: `%${query.search}%` })
          .orWhere("artical.content like :content", { content: `%${query.search}%` })
      }
      const users = await builder.getMany();
      const total = await builder.getCount();
  
      Response.status(200).json({
        data: {
          list: users,
          total
        },
        message: `Artical Data successfully`,
      });
     
  }

  findOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const artical_repo = getRepository(ArticalEntity);
      artical_repo.createQueryBuilder('artical')
        .leftJoinAndSelect("artical.images", "articalimage")
        .leftJoinAndSelect("artical.user", "user")
        .select(['artical.id','artical.name', 'artical.content', 'articalimage.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
        .where("artical.id = :articalid", { articalid: id })
        .getOne()
        .then((res) => {
          if (!res) {
            return resolve({
              error: true,
              message: 'Artical Data not Found',
            });
          } else {
            return resolve({
              data: res,
              error: false,
              message: 'Artical Data get',
            });
          }
        })
        .catch((err) => {
          return reject({
            data: null,
            message: `Internal server error`,
          });
        })
    })
  }

  updateArtical(id: number, body: CreateArticalDto, file): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const articalExits = await this.checkArticalId(id);
      console.log(articalExits,'zdsadsa');
      
      if (!articalExits) {
        return resolve({
          error: true,
          message: 'Artical Data not Found',
        });
      } else {
        const articalRepo = getRepository(ArticalEntity);
        //update artical data
        articalRepo.createQueryBuilder()
          .update(ArticalEntity)
          .set({ name: body.name, content: body.content })
          .where("id = :id", { id })
          .execute()
          .then((articalData) => {
            //update artical image data
            if (!articalData) {
              return resolve({
                message: 'Data not Save..',
                error: true
              })
            } else {
              const articalImageRepo = getRepository(ArticalImageEntity);

              file.map((item) => {
                articalImageRepo.save({
                  image: item.originalname,
                  artical: id
                }).then((res) => {

                }).catch((err) => {
                  console.log('not save this artical image', err)
                })
              })
              return resolve({
                message: 'Data Save..',
                error: false
              })
            }
          })
          .catch((err) => {
            console.log(err, 'err');

          })
      }
    });
  }

  removeArtical(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const articalExits = await this.checkArticalId(id);
      if (!articalExits) {
        return resolve({
          error: false,
          message: 'Artical Data not Found',
        });
      } else {
        //find artical image that present on artical images table and create a array of that
        const articalImageRepo = getRepository(ArticalImageEntity);
        const data = await articalImageRepo.createQueryBuilder('artical_image')
          .leftJoinAndSelect("artical_image.artical", "artical")
          .select(['artical_image.id'])
          .where("artical.id = :articalid", { articalid: id })
          .getMany();

        const dataArr = data.map(object => object.id); //make this array of object data into array bcz in accept only
       //delete record in articalimage table
       console.log(dataArr);
       if(dataArr.length==0){
        return resolve({
          error: true,
          message: 'No any ArticalImage available this artical',
        });
       }else{
        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ArticalImageEntity)
        .where("id IN (:...id)", { id: dataArr })
        .execute()
        .then(async()=>{
          //delete record in post table
          await getConnection().createQueryBuilder()
          .delete().from(ArticalEntity)
          .where('id=:id',{id:id})
          .execute();
          return resolve({
            error: false,
            message: 'Artical Data Deleted',
          });
        })
        .catch(()=>{
          return resolve({
            error: true,
            message: 'Artical Data not Deleted',
          });
        })
       }
       
      }
    });
  }
}
