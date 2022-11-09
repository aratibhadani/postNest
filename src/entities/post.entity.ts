import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostImageEntity } from './post-image.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  @OneToMany(() => PostImageEntity, (image: PostImageEntity) => image.post)
  images: PostImageEntity;
}
