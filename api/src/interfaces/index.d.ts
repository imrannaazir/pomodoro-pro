import { Role } from '@prisma/client';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
type TUser = {
  id: string;
  email: string;
  role: Role;
};

declare global {
  namespace Express {
    interface Request {
      user: TUser | null;
    }
  }
}
