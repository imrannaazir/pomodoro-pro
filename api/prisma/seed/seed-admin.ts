import httpStatus from 'http-status';
import { hashedPassword } from '../../src/app/modules/auth/auth.utils';
import config from '../../src/config';
import AppError from '../../src/errors/appError';
import prisma from '../../src/shared/prisma';

export const seedAdmin = async () => {
  console.log('Start admin seeding...');

  const email = config.credential.admin.email;
  const password = await hashedPassword(config.credential.admin.password!);
  try {
    if (!email || !password) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'ADMIN configuration is missing in environment variables',
      );
    }

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'John Doe',
        password,
        role: 'ADMIN',
      },
    });

    console.log('ADMIN seeding completed');
  } catch (error) {
    console.error('Error seeding ADMIN:', error);
  }
};
