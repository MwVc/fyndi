export type DatabaseUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
};

export interface InsertUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
