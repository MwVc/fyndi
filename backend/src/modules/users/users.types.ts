export type DatabaseUser = {
  avatar: string | null;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string | null;
  role: "user" | "admin";
  created_at: Date;
};

export interface InsertUserData {
  avatar?: string | null;
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
