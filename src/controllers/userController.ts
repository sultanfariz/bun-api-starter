import { Request, Response } from 'express';
import * as userRepo from '../infrastructure/repository/prisma/user/repository';
import * as userSheet from '../infrastructure/repository/gsheet/user/repository';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getUsers();

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get users!',
      content: users,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const getUsersFromSheet = async (req: Request, res: Response) => {
  try {
    const users = await userSheet.getAllUsers();
    let usersRes = users.map((user) => {
      return {
        id: user.get('id'),
        name: user.get('name'),
        email: user.get('email'),
        photoUrl: user.get('photoUrl'),
        role: user.get('role'),
      };
    });

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get users!',
      content: usersRes,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { getUsers, getUsersFromSheet };
