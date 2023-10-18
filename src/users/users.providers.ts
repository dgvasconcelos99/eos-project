import { DataSource } from 'typeorm';
import { UsersConstants } from './constants';
import { User } from './users.entity';

export const userProviders = [
  {
    provide: UsersConstants.userRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [UsersConstants.dataSource],
  },
];
