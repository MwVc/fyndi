import request from "supertest";
import { authServices } from "./auth.service.js";

// mock middlewares before importing app
// use path to middleware files
jest.mock("./middlewares/csrf.middleware.ts", () => ({
  verifyCsrfToken: (req: any, res: any, next: any) => next(),
}));

jest.mock("./middlewares/verify_access_token.middleware.ts", () => ({
  accessTokenMiddleware: (req: any, res: any, next: any) => next(),
}));

jest.mock("./auth.service.js");

import app from "../../app.js";

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
