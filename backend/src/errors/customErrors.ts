import type { ErrorCode } from "./errorCodes.js";

class ApiError extends Error {
  public statusCode: number;
  public errorCode: ErrorCode;
  public details: unknown;

  constructor(
    statusCode: number,
    errorCode: ErrorCode,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}

export default ApiError;
