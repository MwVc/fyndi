class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details: unknown;

  constructor(
    statusCode: number,
    errorCode: string,
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
