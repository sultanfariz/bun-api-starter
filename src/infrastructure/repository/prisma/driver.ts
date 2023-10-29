import { PrismaClient, Role, Status } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;
export { Role, Status };
