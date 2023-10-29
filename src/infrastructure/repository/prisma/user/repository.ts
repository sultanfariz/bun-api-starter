import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertUser = async (data: any) => {
  try {
    const createdUser = await prisma.user.create({
      data: data,
    });

    return createdUser;
  } catch (error: any) {
    throw error;
  }
};

const updateUser = async (id: number, data: any) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        photoUrl: true,
        role: true,
      },
    });

    return users;
  } catch (error: any) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error: any) {
    throw error;
  }
};

export { insertUser, updateUser, getUsers, getUserByEmail };
