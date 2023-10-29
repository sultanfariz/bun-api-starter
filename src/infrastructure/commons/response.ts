import { Response } from 'express';
import {
  NotFoundError,
  DuplicatedDataError,
  ForbiddenAccessError,
  UnauthorizedError,
  UnprocessableEntityError,
  CustomError,
} from './exceptions';

type ResponseDTO = {
  code: number;
  success: boolean;
  message?: string;
  content?: any;
};

const response = (res: Response, data: ResponseDTO) => {
  return res.status(data.code).json({
    code: data.code,
    success: data.success,
    message: data.message || '',
    content: data.content || null,
  });
};

const exceptionResponse = (res: Response, error: CustomError) => {
  let code = 200;

  switch (error.constructor) {
    case UnauthorizedError:
      code = 401;
      break;
    case ForbiddenAccessError:
      code = 403;
      break;
    case NotFoundError:
      code = 404;
      break;
    case DuplicatedDataError:
      code = 409;
      break;
    case UnprocessableEntityError:
      code = 422;
      break;
    default:
      code = 500;
  }

  return response(res, {
    code,
    success: false,
    message: error.message || 'Something went wrong!',
    content: error.content,
  });
};

export { ResponseDTO, response, exceptionResponse };
