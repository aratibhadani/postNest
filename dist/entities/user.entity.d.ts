import { user_status } from 'src/constants/pagination.enum';
import { ArticalEntity } from './artical.entity';
import { PostEntity } from './post.entity';
export declare class UserEntity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_no: string;
    password: string;
    login_token: string;
    forget_token: string;
    is_active: user_status;
    posts: PostEntity[];
    articals: ArticalEntity[];
    createdAt: Date;
    updatedAt: Date;
}
