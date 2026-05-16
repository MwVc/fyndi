export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface SafeUser {
  id: number;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}
