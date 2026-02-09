export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
};

export type RefreshToken = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  revoked: boolean;
};
