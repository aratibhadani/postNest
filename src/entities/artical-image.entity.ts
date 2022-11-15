import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticalEntity } from './artical.entity';

@Entity({ name: 'articalimage' })
export class ArticalImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false,length:100 })
  image: string;

  @ManyToOne(() => ArticalEntity, (artical) => artical.images, {
    nullable: false,
  })
  @JoinColumn({ name: "artical_id" })
  artical: number;

  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" ,nullable: false,onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

