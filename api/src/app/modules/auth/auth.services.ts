import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import AppError from '../../../errors/appError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { TLogin, TRegister } from './auth.types';
import { hashedPassword } from './auth.utils';

const register = async (payload: TRegister) => {
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: payload.email,
        },
        {
          phoneNumber: payload.phoneNumber,
        },
      ],
    },
  });

  if (isUserAlreadyExist) {
    throw new AppError(httpStatus.CONFLICT, 'User is already registered.');
  }

  const hashPassword = await hashedPassword(payload.password);

  const result = await prisma.$transaction(async transactionClient => {
    const newUser = await transactionClient.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (payload.role === 'EMPLOYER') {
      if (!payload.companyName) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Company name is required.');
      }

      await transactionClient.company.create({
        data: {
          companyName: payload.companyName!,
          userId: newUser?.id,
        },
      });
    } else {
      if (!payload.fullName) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Fullname is required.');
      }
      await transactionClient.candidate.create({
        data: {
          fullName: payload.fullName!,
          userId: newUser?.id,
        },
      });
    }

    return newUser;
  });

  const verifyToken = jwtHelpers.generateToken(
    {
      id: result.id,
      email: result.email,
      role: result.role,
    },
    config.verify_token as string,
    config.verify_expire_in as string,
  );

  return result;
};

const login = async (payload: TLogin) => {
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phoneNumber: payload.phoneNumber }],
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

  if (isUserAlreadyExist.status === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (isUserAlreadyExist.status === 'PENDING') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is not verified.');
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  return {
    id: isUserAlreadyExist.id,
    email: isUserAlreadyExist.email,
    phoneNumber: isUserAlreadyExist?.phoneNumber,
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

  if (userData.status === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (userData.status === 'PENDING') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account is not verified.');
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
