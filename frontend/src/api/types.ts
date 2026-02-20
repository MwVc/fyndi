"T: some data type that we dont know yet";
export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  error: null;
  meta: {
    timestamp: string;
  };
};

// a failed API response
export type ApiError = {
  success: false; // tells the UI this failed
  message: string; // error message
  data: null;
  error: {
    details: string; // optional HTTP status code
    code: string; // optional app-specific error code
    message: string;
  };
};

export type ApiResult<T> = ApiSuccess<T> | ApiError; // union type
