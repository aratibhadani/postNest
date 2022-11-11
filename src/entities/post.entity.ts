import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostImageEntity } from './post-image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: PostEntity;

  @OneToMany(() => PostImageEntity, (image: PostImageEntity) => image.post)
  images: PostImageEntity[];
}
