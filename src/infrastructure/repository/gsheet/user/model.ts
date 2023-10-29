// declare model user so we could pass it as type of user repository param
type User = {
  id: number;
  email: string;
  name: string;
  photoUrl: string;
  role: string;
};

export { User };
