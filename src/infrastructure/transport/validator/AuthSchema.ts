import { z } from 'zod';

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(255),
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
});

const loginSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
});

export { userSchema, loginSchema };
