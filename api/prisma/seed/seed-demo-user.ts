import httpStatus from 'http-status';
import { hashedPassword } from '../../src/app/modules/auth/auth.utils';
import config from '../../src/config';
import AppError from '../../src/errors/appError';
import prisma from '../../src/shared/prisma';

export const seedDemoUser = async () => {
  console.log('Start user seeding...');

  const email = config.credential.user.email;
  const password = await hashedPassword(config.credential.user.password!);
  try {
    if (!email || !password) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User configuration is missing in environment variables',
      );
    }

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'John Doe',
        password,
        role: 'USER',
      },
    });

    console.log('User seeding completed');
  } catch (error) {
    console.error('Error seeding User:', error);
  }
};
