import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";

export function authMiddleware(request: Request, _response: Response, next: NextFunction) {
  const header = request.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = header.slice("Bearer ".length).trim();

  if (!token) {
    next();
    return;
  }

  try {
    request.auth = verifyAccessToken(token);
    next();
  } catch (error) {
    next(error);
  }
}
