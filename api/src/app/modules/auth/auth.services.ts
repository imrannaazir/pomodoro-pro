import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import AppError from '../../../errors/appError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { TLogin } from './auth.types';
import { hashedPassword } from './auth.utils';

const register = async (payload: User) => {
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isUserAlreadyExist) {
    throw new AppError(httpStatus.CONFLICT, 'User is already registered.');
  }

  const hashPassword = await hashedPassword(payload.password!);

  const result = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashPassword,
      role: payload.role,
      name: payload.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const login = async (payload: TLogin) => {
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!isUserAlreadyExist?.id) {
    throw new AppError(httpStatus.CONFLICT, 'User Not Found!!!');
  }
  const isCorrectPassword = await bcrypt.compare(
    payload!.password!,
    isUserAlreadyExist!.password!,
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Incorrect password');
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      name: isUserAlreadyExist?.name,
      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      name: isUserAlreadyExist?.name,

      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  return {
    id: isUserAlreadyExist.id,
    email: isUserAlreadyExist.email,
    name: isUserAlreadyExist?.name,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt__refresh_secret as string,
    );
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }
  const userData = await prisma.user.findFirst({
    where: {
      AND: [{ email: decodedData.email }],
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );

  return {
    id: userData.id,
    email: userData.email,
    accessToken,
  };
};

const AuthServices = {
  register,
  login,
  refreshToken,
};

export default AuthServices;
