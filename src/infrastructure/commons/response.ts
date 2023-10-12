import { Response } from 'express';

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

const exceptionResponse = (res: Response, error: Error) => {
  if (error.name === 'NotFoundError')
    return response(res, {
      code: 404,
      success: false,
      message: error.message,
    });

  if (error.name === 'DuplicatedDataError')
    return response(res, {
      code: 409,
      success: false,
      message: error.message,
    });

  if (error.name === 'UnprocessableEntityError')
    return response(res, {
      code: 422,
      success: false,
      message: error.message,
    });

  if (error.name === 'UnauthorizedError')
    return response(res, {
      code: 401,
      success: false,
      message: error.message,
    });
  if (error.message === 'Validation error')
    return response(res, {
      code: 409,
      success: false,
      message: 'Employee already exists!'
    });

  return response(res, {
    code: 500,
    success: false,
    message: error.message || 'Something went wrong!',
  });
};

export { ResponseDTO, response, exceptionResponse };