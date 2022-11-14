import { ArticalImageEntity } from './artical-image.entity';
export declare class ArticalEntity {
    id: number;
    name: string;
    content: string;
    user: number;
    images: ArticalImageEntity[];
}
