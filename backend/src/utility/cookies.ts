import { Response } from "express";

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number; // in milliseconds
}

/**
 * Sets a cookie on the response object.
 *
 * @param res - The Express response object.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional settings for the cookie.
 */
export function setCookie(
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // Default to 24 hours
  };
  const finalOptions = { ...defaultOptions, ...options };
  res.cookie(name, value, finalOptions);
}
