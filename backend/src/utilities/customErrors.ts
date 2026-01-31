class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details: unknown;

  public isApiError = true; // classify thrown error as API error not system level error

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
