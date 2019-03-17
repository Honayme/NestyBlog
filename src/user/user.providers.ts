import { User } from './models/user.entity';

export const userProviders = [
    {
        provide: 'UserRepository',
        useValue: User,
    },
];
