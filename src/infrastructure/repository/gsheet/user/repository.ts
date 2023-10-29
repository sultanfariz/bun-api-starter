import { getSheet } from '../driver';
import { User } from './model';

const insertUser = async (data: User) => {
  try {
    const sheet = await getSheet('User', [
      'id',
      'name',
      'email',
      'photoUrl',
      'role',
    ]);

    const createdUser = await sheet.addRow(data);
    if (createdUser === undefined) {
      throw new Error('User not created');
    }
    return createdUser;
  } catch (error: any) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const sheet = await getSheet('User', [
      'id',
      'name',
      'email',
      'photoUrl',
      'role',
    ]);

    const rows = await sheet.getRows();
    console.log('rows', rows);
    return rows;
  } catch (error: any) {
    throw error;
  }
};

export { insertUser, getAllUsers };
