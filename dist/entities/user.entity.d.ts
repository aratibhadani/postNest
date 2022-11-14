import { ArticalEntity } from './artical.entity';
import { PostEntity } from './post.entity';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contactno: string;
    password: string;
    loginToken: string;
    forgetToken: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    posts: PostEntity[];
    articals: ArticalEntity[];
}
