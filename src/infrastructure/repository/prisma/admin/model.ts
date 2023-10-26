import { User } from '../user/model';

type Admin = {
  id: number | null;
  userId: number | null;
  user: User | null;
  status: string | null;
  lastLogin: Date | null;
};

export { Admin };
