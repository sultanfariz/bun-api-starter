import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const insertAdmin = async (data: any) => {
  try {
    const createdAdmin = await prisma.admin.create({
      data: data,
    });

    return createdAdmin;
  } catch (error: any) {
    throw error;
  }
};

const updateAdmin = async (id: number, data: any) => {
  try {
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: id,
      },
      data: data,
    });

    return updatedAdmin;
  } catch (error: any) {
    throw error;
  }
};

const getAdminByUserId = async (userId: number) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        userId: userId,
      },
    });

    return admin;
  } catch (error: any) {
    throw error;
  }
};

export { insertAdmin, updateAdmin, getAdminByUserId };
