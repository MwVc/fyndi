import request from "supertest";

// mock middlewares before importing app
// use path to middleware files
jest.mock("./middlewares/csrf.middleware.ts", () => ({
  verifyCsrfToken: (req: any, res: any, next: any) => next(),
}));

jest.mock("./middlewares/verify_access_token.middleware.ts", () => ({
  accessTokenMiddleware: (req: any, res: any, next: any) => next(),
}));
import app from "../../app.js";

describe("Root api endpoint", () => {
  it("should return a 200 successful response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
