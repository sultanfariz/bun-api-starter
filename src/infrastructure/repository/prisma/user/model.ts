// declare model user so we could pass it as type of user repository param
type User = {
  id: number | null;
  email: string;
  password: string;
  name: string | null;
  photoUrl: string | null;
  role: string;
};

export { User };
