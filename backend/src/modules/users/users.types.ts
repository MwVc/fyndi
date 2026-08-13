export type DatabaseUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  created_at: Date;
};

export interface InsertUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
}

export type PublicUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
};
