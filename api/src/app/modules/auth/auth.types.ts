import { User } from '@prisma/client';

export type TLogin = Pick<User, 'email' | 'password'>;
