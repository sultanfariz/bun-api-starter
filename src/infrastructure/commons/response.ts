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
    code: data.code || 200,
    success: data.success,
    message: data.message || '',
    content: data.content || null,
  });
};

const exceptionResponse = (res: Response, error: CustomError) => {
  return response(res, {
    code: error.code || 500,
    success: false,
    message: error.message || 'Something went wrong!',
    content: error.content,
  });
};

export { ResponseDTO, response, exceptionResponse };
