import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";
import { ApiError } from "../utils/api-error.js";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: "user" | "creator" | "admin";
}

export interface RefreshTokenPayload {
  sub: string;
  sessionId: string;
}

const accessSignOptions: SignOptions = {
  expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
};

const refreshSignOptions: SignOptions = {
  expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
};

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.jwtAccessSecret, accessSignOptions);
}

export function signRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, env.jwtRefreshSecret, refreshSignOptions);
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, env.jwtAccessSecret) as AccessTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, env.jwtRefreshSecret) as RefreshTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
}
