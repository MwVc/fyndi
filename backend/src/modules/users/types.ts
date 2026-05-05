export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin" | "fundi";
  createdAt: Date;
};
