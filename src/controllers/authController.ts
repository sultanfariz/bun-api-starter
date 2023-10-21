import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  insertUser,
  getUserByEmail,
} from '../infrastructure/repository/prisma/user/repository';
import { response, exceptionResponse } from '../infrastructure/commons/response';
import { DuplicatedDataError, UnauthorizedError } from '../infrastructure/commons/exceptions';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await getUserByEmail(email);
    if (user) {
      throw new DuplicatedDataError('User already exist!');
    }

    const data = {
      email,
      password: await Bun.password.hash(password),
      name,
      photoUrl:
        'https://eu.ui-avatars.com/api/?name=' +
        name.replace(/\s/g, '+') +
        '&size=250',
    };

    const createdUser = await insertUser(data);

    return response(res, {
      code: 201,
      success: true,
      message: 'Successfully create user!',
      content: createdUser,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Email or password is incorrect!');
    }
    if (!await Bun.password.verify(password, user.password)) {
      throw new UnauthorizedError('Email or password is incorrect!');
    }

    const payload = {
      id: user.id,
      name: user.name,
    };
    
    let accessToken = jwt.sign(payload, process.env.TOKEN || '', {
      expiresIn: process.env.TOKEN_EXPIRED,
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Successfully login user!',
      content: accessToken,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { register, login };
