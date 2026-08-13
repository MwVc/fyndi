export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface OAuthProfile {
  providerUserId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: "google" | "facebook";
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}
