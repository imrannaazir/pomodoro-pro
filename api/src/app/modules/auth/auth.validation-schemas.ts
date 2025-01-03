import { Role } from '@prisma/client';
import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    password: z.string({
      required_error: 'Password is required.',
    }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required.',
    }),

    role: z.enum(Object.keys(Role) as [string, ...string[]]),

    name: z.string().optional(),
  }),
});

const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
};
export default AuthValidation;
