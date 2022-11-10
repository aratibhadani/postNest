import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticalImageEntity } from "./artical-image.entity";

export class ArticalEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    content: string;
  
    @OneToMany(() => ArticalImageEntity, (image: ArticalImageEntity) => image.artical)
    images: ArticalImageEntity;

}
