import * as dotenv from 'dotenv';
import app from './app';
import config from './infrastructure/repository/mysql/drivers';
import { Sequelize } from 'sequelize';

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
  const sequelize = config as Sequelize;

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');

    const port = normalizePort(process.env.PORT);
    app.listen(port, () => console.log(`Application running on port ${port}`));
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
