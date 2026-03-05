// d.ts 'declaration file'  do not exist at runtime -> purely for typescript

// import type definitions
import "express-serve-static-core";

// Module augmentation: extend the existing Express Request interface
declare module "express-serve-static-core" {
  interface Request {
    // Cookies added by cookie-parser middleware
    cookies: Record<string, string>;
    // signedCookies: Record<string, string>;
  }
}
