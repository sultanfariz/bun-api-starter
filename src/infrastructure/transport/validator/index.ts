import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { exceptionResponse, response } from '../../commons/response';
import { UnprocessableEntityError } from '../../commons/exceptions';

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

const validateBody = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) return next();
      let extractedErrors: any = [];
      result.error.issues.map((issue) => {
        issue.message = issue.message.replace(/_/g, ' ');
        extractedErrors.push({
          [issue.path[0]]: issue.message,
        });
      });

      if (extractedErrors.length > 0)
        throw new UnprocessableEntityError(
          'Validation Failed',
          extractedErrors
        );

      return next();
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
};
export default validateBody;
export { userSchema, loginSchema };
