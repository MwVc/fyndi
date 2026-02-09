import type { ErrorCode } from "./code.errors.js";

class ApiError extends Error {
  public statusCode: number;
  public errorCode: ErrorCode;
  public details: unknown;
  public expose: boolean;

  constructor(
    statusCode: number,
    errorCode: ErrorCode,
    message: string,
    expose: false,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.expose = expose;
  }
}

export default ApiError;
