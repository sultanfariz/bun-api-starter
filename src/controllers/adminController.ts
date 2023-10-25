import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  insertUser,
  getUserByEmail,
} from '../infrastructure/repository/prisma/user/repository';
import { insertAdmin as insertAdminRepository } from '../infrastructure/repository/prisma/admin/repository';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import { DuplicatedDataError } from '../infrastructure/commons/exceptions';

const prisma = new PrismaClient();

const insertAdmin = async (req: Request, res: Response) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { email, password, name } = req.body;

      const user = await getUserByEmail(email);
      if (user) {
        throw new DuplicatedDataError('User already exist!');
      }

      const userData = {
        email,
        password: await Bun.password.hash(password),
        name,
        photoUrl:
          'https://eu.ui-avatars.com/api/?name=' +
          name.replace(/\s/g, '+') +
          '&size=250',
      };

      const createdUser = await insertUser(userData);

      const adminData = {
        userId: createdUser.id,
      };

      const createdAdmin = await insertAdminRepository(adminData);

      return response(res, {
        code: 201,
        success: true,
        message: 'Successfully create admin!',
        content: {
          userId: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          photoUrl: createdUser.photoUrl,
          role: createdUser.role,
          adminId: createdAdmin.id,
          status: createdAdmin.status,
          lastLogin: createdAdmin.lastLogin,
        },
      });
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { insertAdmin };
