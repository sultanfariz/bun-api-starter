import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  NotFoundError,
  ForbiddenAccessError,
  UnauthorizedError,
} from '../exceptions';
import { exceptionResponse } from '../response';

interface CustomRequest extends Request {
  user: string | undefined;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token)
      throw new NotFoundError('A token is required for authentication');

    jwt.verify(token, process.env.TOKEN || '', (err, decoded) => {
      if (err) {
        throw new UnauthorizedError(
          'Your token does not match our credentials'
        );
      }
      if (decoded) {
        res.locals = {
          user: decoded,
        };
      }
    });
  } catch (error: any) {
    exceptionResponse(res, error);
  }
  return next();
};

const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const role = res.locals.user?.role;
      if (roles.includes(role)) return next();
      else
        throw new ForbiddenAccessError(
          'You are not allowed to access this resource!'
        );
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
};

export { auth, verifyRole };
