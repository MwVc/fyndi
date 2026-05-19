import request from "supertest";

// mock middlewares before importing app preventing routes and middlewares being attached
// use path to middleware files
jest.mock("./middlewares/csrf.middleware.ts", () => ({
  verifyCsrfToken: (req: any, res: any, next: any) => next(),
}));

jest.mock("./middlewares/verify_access_token.middleware.ts", () => ({
  accessTokenMiddleware: (req: any, res: any, next: any) => next(),
}));

jest.mock("./middlewares/verify_refresh_token.middleware.ts", () => ({
  refreshTokenMiddleware: (req: any, res: any, next: any) => {
    req.user = {
      userId: "1",
      role: "user",
    };

    next();
  },
}));

// mock the service layer before app is imported
jest.mock("./auth.service.js");

import app from "../../app.js";
import { authServices } from "./auth.service.js"; // authService is already mocked

describe("Root api endpoint", () => {
  it("should return a 200 successful response", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("registerUser controller", () => {
  it("Should create a user successfully", async () => {
    // 1. Mock service
    (authServices.register as jest.Mock).mockResolvedValue({});

    // 2. Call API to trigger controller
    const response = await request(app).post("/auth/register").send({
      firstName: "Victor",
      lastName: "Mwadime",
      email: "victormwadime@gmail.com",
      password: "12345",
    });

    // 3. assertions
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("user created successfully");
  });
});

describe("loginUser controller", () => {
  it("Should login user successfully", async () => {
    // 1. Mock service
    (authServices.login as jest.Mock).mockResolvedValue({
      user: {
        id: "0",
        firstName: "Victor",
        lastName: "Mwadime",
        email: "victormwadime@gmail.com",
        role: "user",
      },
      accessToken: { token: "random token string", maxAge: 15 * 60 * 1000 },
      refreshToken: {
        token: "random token string",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      csrfToken: "random token string",
    });

    // call API
    const response = await request(app).post("/auth/login").send({
      email: "victormwadime@gmail.com",
      password: "randompasswordstring",
    });

    // assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Logged in");

    // check controller called service correctly
    expect(authServices.login).toHaveBeenCalledWith({
      email: "victormwadime@gmail.com",
      password: "randompasswordstring",
    });
  });
});

describe("refreshUser controller", () => {
  it("Should refresh user successfully", async () => {
    // mock service
    (authServices.refresh as jest.Mock).mockResolvedValue({
      accessToken: { token: "random token string", maxAge: 15 * 60 * 1000 },
      refreshToken: {
        token: "random token string",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      csrfToken: "random token string",
    });

    // call API
    const response = await await request(app).post("/auth/refresh").send();

    // assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Refresh successful");
    expect(authServices.login).toHaveBeenCalledWith;
  });
});
