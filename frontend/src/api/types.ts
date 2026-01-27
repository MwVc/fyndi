"T: some data type that we dont know yet";
export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

// a failed API response
export type ApiError = {
  ok: false; // tells the UI this failed
  error: {
    message: string; // error message
    status?: number; // optional HTTP status code
    code?: string; // optional app-specific error code
  };
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;
