import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { NotFoundError, UnauthorizedError } from '../exceptions';
import { response } from '../response';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
 user: string | JwtPayload | undefined;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token)
      throw new NotFoundError('A token is required for authentication');

      console.log(process.env.TOKEN);
      console.log(token);

    jwt.verify(token, process.env.TOKEN || '', (err, decoded) => {
      if (err)
        throw new UnauthorizedError(
          "Your token doesn't match our credentials"
        );
      console.log(decoded);
      if (decoded) (req as CustomRequest).user = decoded;
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
    // const role = req.user.role;
    // if (roles.includes(role)) {
    //   return next();
    // } else {
    //   return response(res, {
    //     code: 403,
    //     success: false,
    //     message: 'You are not authorized to access this resource',
    //   });
    // }
  };
};

export { auth, verifyRole };
