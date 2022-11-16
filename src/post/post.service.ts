import { HttpStatus, Injectable } from '@nestjs/common';
import { PostImageEntity } from 'src/entities/post-image.entity';
import { PostEntity } from 'src/entities/post.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Connection } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from 'src/user/user.service';
import { PaginationParamsDTO } from 'src/config/pagination.dto';
import { default_count, default_sort_order } from 'src/constants/pagination.enum';

@Injectable()
export class PostService {
  constructor(private connection: Connection,
    private readonly userService: UserService
  ) { }

  createPost(file, body,userId): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const userCheck = await this.userService.checkUserByUserId(userId);
      if (!userCheck) {
        return resolve({
          message: 'User not Found',
          error: true
        })
      } else {
        const postRepo = getRepository(PostEntity);
        const postImageRepo = getRepository(PostImageEntity);
        postRepo.save({
          name: body.name,
          content: body.content,
          user: userId
        }).then((postData) => {
          console.log(postData)
          if (!postData) {
            return resolve({
              message: 'Data not Save..',
              error: true
            })
          } else {

            file.map((item) => {
              postImageRepo.save({
                image: item.originalname,
                post: postData.id
              }).then((res) => {
                console.log('res', res.id)
              }).catch((err) => {
                console.log('not save this post image', err)
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


  //check post id is present or not
  checkPostId(postId: number) {
    return getRepository(PostEntity).findOne({ where: { id: postId } });
  }

  //get all post of related iamges and joimn user data
  async findAllPost(query: PaginationParamsDTO, Response) {
    const post_repo = getRepository(PostEntity);
    const take = query.count != undefined && query.count > 0 ? query.count : default_count;
    const skip = query.page != undefined && query.page > 0 ? (query.page - 1) : 0;

    let builder = post_repo.createQueryBuilder('post')
      .leftJoinAndSelect("post.images", "post_image")
      .leftJoinAndSelect("post.user", "user")
      .select(['post.name', 'post.content', 'post_image.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
    // .take(2)
    // .skip(1);

    if (query.sortby && query.sort) {
      let sortOrder = query.sort ? query.sort.toUpperCase() : default_sort_order;
      if (sortOrder == 'ASC')
        builder = builder.orderBy(`post.${query.sortby}`, 'ASC')
      else {
        builder = builder.orderBy(`post.${query.sortby}`, 'DESC')
      }
    } else {
      builder = builder.orderBy('post.createdAt', 'DESC')
    }

    if (query.search) {
      builder = builder.where("post.name like :name", { name: `%${query.search}%` })
        .orWhere("post.content like :content", { content: `%${query.search}%` })
    }
    const users = await builder.getMany();
    const total = await builder.getCount();

    Response.status(200).json({
      data: {
        list: users,
        total
      },
      message: `post Data successfully`,
    });
  }

  findOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const post_repo = getRepository(PostEntity);
      post_repo.createQueryBuilder('post')
        .leftJoinAndSelect("post.images", "postimage")
        .leftJoinAndSelect("post.user", "user")
        .select(['post.id', 'post.name', 'post.content', 'postimage.image', 'user.first_name', 'user.last_name', 'user.email', 'user.is_active'])
        .where("post.id = :postid", { postid: id })
        .getOne()
        .then((res) => {
          if (!res) {
            return resolve({
              error: true,
              message: 'Post Data not Found',
            });
          } else {
            return resolve({
              data: res,
              error: false,
              message: 'Post Data get',
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

  updatePost(id: number, body: CreatePostDto, file): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postExits = await this.checkPostId(id);
      if (!postExits) {
        return resolve({
          error: true,
          message: 'Post Data not Found',
        });
      } else {
        const postRepo = getRepository(PostEntity);
        //update post data
        postRepo.createQueryBuilder()
          .update(PostEntity)
          .set({ name: body.name, content: body.content })
          .where("id = :id", { id })
          .execute()
          .then((postData) => {
            //update post image data
            if (!postData) {
              return resolve({
                message: 'Data not Save..',
                error: true
              })
            } else {
              const postImageRepo = getRepository(PostImageEntity);

              file.map((item) => {
                postImageRepo.save({
                  image: item.originalname,
                  post: id
                }).then((res) => {

                }).catch((err) => {
                  console.log('not save this post image', err)
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

  removePost(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const postExits = await this.checkPostId(id);
      if (!postExits) {
        return resolve({
          error: false,
          message: 'Post Data not Found',
        });
      } else {
        //find post image that present on post images table and create a array of that
        const postImageRepo = getRepository(PostImageEntity);
        const data = await postImageRepo.createQueryBuilder('post_image')
          .leftJoinAndSelect("post_image.post", "post")
          .select(['post_image.id'])
          .where("post.id = :postid", { postid: id })
          .getMany();

        const dataArr = data.map(object => object.id); //make this array of object data into array bcz in accept only
        //delete record in postimage table
        console.log(dataArr);
        if (dataArr.length == 0) {
          return resolve({
            error: true,
            message: 'No any PostImage available this post',
          });
        } else {
          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(PostImageEntity)
            .where("id IN (:...id)", { id: dataArr })
            .execute()
            .then(async () => {
              //delete record in post table
              await getConnection().createQueryBuilder()
                .delete().from(PostEntity)
                .where('id=:id', { id: id })
                .execute();
              return resolve({
                error: false,
                message: 'Post Data Deleted',
              });
            })
            .catch(() => {
              return resolve({
                error: true,
                message: 'Post Data not Deleted',
              });
            })
        }

      }
    });
  }
}
