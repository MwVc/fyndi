// Application-wide error codes

export const AuthErrorCodes = {
  INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  TOKEN_INVALID: "AUTH_TOKEN_INVALID",
  TOKEN_MISSING: "AUTH_TOKEN_MISSING",
  UNAUTHORIZED: "AUTH_UNAUTHORIZED",
  FORBIDDEN: "AUTH_FORBIDDEN",
} as const;

export const UserErrorCodes = {
  NOT_FOUND: "USER_NOT_FOUND",
  ALREADY_EXISTS: "USER_ALREADY_EXIST",
  EMAIL_EXISTS: "USER_EMAIL_EXISTS",
  USERNAME_EXISTS: "USER_USERNAME_EXISTS",
  ACCOUNT_DISABLED: "USER_ACCOUNT_DISABLED",
} as const;

export const ValidationErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_REQUEST_BODY: "INVALID_REQUEST_BODY",
  INVALID_QUERY_PARAMS: "INVALID_QUERY_PARAMS",
  MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
  INVALID_EMAIL_FORMAT: "INVALID_EMAIL_FORMAT",
  INVALID_PASSWORD_FORMAT: "INVALID_PASSOWRD_FORMAT",
};

export const PermissionErrorCodes = {
  NOT_FOUND: "RESOURCE_NOT_FOUND",
  ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",
  CONFLICT: "RESOURCE_CONFLICT",
  STATE_INVALID: "RESOURCE_STATE_INVALID",
} as const;

export const SystemErrorCodes = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_FAILURE: "EXTERNAL_SERVICE_FAILURE",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
} as const;

//{[typeof obj} get the objects type -> {keyof typeof obj}get a union of the keys -> {obj[keyof typeof obj]}get a union if the values at those keys
export type ErrorCode =
  | (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes]
  | (typeof UserErrorCodes)[keyof typeof UserErrorCodes]
  | (typeof ValidationErrorCodes)[keyof typeof ValidationErrorCodes]
  | (typeof PermissionErrorCodes)[keyof typeof PermissionErrorCodes]
  | (typeof SystemErrorCodes)[keyof typeof SystemErrorCodes];
