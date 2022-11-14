import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ArticalImageEntity } from './artical-image.entity';
import { PostImageEntity } from './post-image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'artical' })
export class ArticalEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  
  @ManyToOne(() => UserEntity, (user) => user.articals)
  @JoinColumn({ name: "user_id" })
  user: number;

  @OneToMany(() => ArticalImageEntity, (articalimage) => articalimage.artical)
  images: ArticalImageEntity[];
}

