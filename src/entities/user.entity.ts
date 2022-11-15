import { user_status } from 'src/constants/pagination.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticalEntity } from './artical.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  contact_no: string;

  @Column({type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ nullable: true })
  login_token: string;

  @Column({ nullable: true })
  forget_token: string;

  @Column({
    type: 'enum',
    enum: [user_status.ACTIVED, user_status.INACTIVED],
    default: user_status.ACTIVED,
    nullable: false,
  })
  is_active: user_status;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => ArticalEntity, (artical) => artical.user)
  articals: ArticalEntity[];


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" ,nullable: false,onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
