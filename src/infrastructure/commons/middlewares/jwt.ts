import jwt, { Secret } from 'jsonwebtoken';
import { NotFoundError, UnauthorizedError } from '../exceptions';
import { response } from '../response';
import { Request, Response, NextFunction } from 'express';

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
        throw new UnauthorizedError('Your token does not match our credentials');
      }
      if (decoded) {
        res.locals.user = {
          user: decoded,
        };
      }
    });
  } catch (error: any) {
    if (error.name === 'NotFoundError')
      return response(res, {
        code: 404,
        success: false,
        message: error.message,
      });

    if (error.name === 'WrongIdentityError')
      return response(res, {
        code: 403,
        success: false,
        message: error.message,
      });

    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
  return next();
};

const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = res.locals.user?.role;
    if (roles.includes(role)) {
      return next();
    } else {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to access this resource',
      });
    }
  };
};

export { auth, verifyRole };
