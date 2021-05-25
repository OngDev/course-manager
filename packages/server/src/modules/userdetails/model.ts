import { Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'userdetail' })
export class UserDetail extends BaseEntity {  
}
