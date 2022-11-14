import { PostImageEntity } from './post-image.entity';
export declare class PostEntity {
    id: number;
    name: string;
    content: string;
    user: number;
    images: PostImageEntity[];
}
