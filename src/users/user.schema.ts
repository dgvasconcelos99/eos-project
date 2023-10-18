import { UserEntity } from './users.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'User',
  target: UserEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  relations: {
    //To be implemented
  },
});
