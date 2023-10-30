import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { exceptionResponse, response } from '../../commons/response';
import { UnprocessableEntityError } from '../../commons/exceptions';
import { userSchema, loginSchema } from './AuthSchema';

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
