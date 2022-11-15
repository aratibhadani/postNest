import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ArticalImageEntity } from './artical-image.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'artical' })
export class ArticalEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  
  @ManyToOne(() => UserEntity, (user) => user.articals, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: number;

  @OneToMany(() => ArticalImageEntity, (articalimage) => articalimage.artical)
  images: ArticalImageEntity[];
  
 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" ,nullable: false,onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

