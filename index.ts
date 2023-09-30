import * as dotenv from 'dotenv';
import app from './app';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

function normalizePort(port: string | undefined): number {
  if (typeof port === 'string') {
    return parseInt(port, 10);
  } else if (typeof port === 'undefined') {
    return 4000;
  }
  return port;
}

try {
  const port = normalizePort(process.env.PORT);
  app.listen(port, () => console.log(`Application running on port ${port}`));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
