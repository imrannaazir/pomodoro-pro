import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import AppError from '../../../errors/appError';

export const hashedPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword: string = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds),
    );
    return hashedPassword;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error hashing password',
    );
  }
};
