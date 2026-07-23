import { randomUUID } from "node:crypto";

import bcrypt from "bcryptjs";
import type { Response } from "express";

import { env } from "../../../shared/config/env.js";
import { getRedisClient } from "../../../shared/database/redis.js";
import { ApiError } from "../../../shared/utils/api-error.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../../shared/utils/jwt.js";
import { userRepository } from "../../users/repositories/user.repository.js";
import { mapUserToPublic } from "../../users/utils/map-user.js";

const REFRESH_COOKIE = "gamesunite_refresh_token";
const SESSION_PREFIX = "session:";
const RESET_PREFIX = "password-reset:";

function getRefreshCookieOptions(remember = false) {
  const maxAge = remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax" as const,
    domain: env.cookieDomain,
    path: "/",
    maxAge,
  };
}

async function createSession(userId: string) {
  const sessionId = randomUUID();
  const redis = getRedisClient();
  await redis.set(`${SESSION_PREFIX}${sessionId}`, userId, "EX", 7 * 24 * 60 * 60);
  return sessionId;
}

async function revokeSession(sessionId: string) {
  const redis = getRedisClient();
  await redis.del(`${SESSION_PREFIX}${sessionId}`);
}

async function getSessionUserId(sessionId: string) {
  const redis = getRedisClient();
  return redis.get(`${SESSION_PREFIX}${sessionId}`);
}

function setRefreshCookie(response: Response, refreshToken: string, remember = false) {
  response.cookie(REFRESH_COOKIE, refreshToken, getRefreshCookieOptions(remember));
}

function clearRefreshCookie(response: Response) {
  response.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    domain: env.cookieDomain,
    path: "/",
  });
}

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new ApiError(409, "An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await userRepository.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const sessionId = await createSession(user._id.toString());
    const publicUser = mapUserToPublic(user);
    const accessToken = signAccessToken({
      sub: publicUser.id,
      email: publicUser.email,
      role: publicUser.role,
    });
    const refreshToken = signRefreshToken({
      sub: publicUser.id,
      sessionId,
    });

    return { user: publicUser, accessToken, refreshToken };
  },

  async login(input: { email: string; password: string; remember?: boolean }) {
    const user = await userRepository.findByEmail(input.email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValidPassword) {
      throw new ApiError(401, "Invalid email or password");
    }

    const sessionId = await createSession(user._id.toString());
    const publicUser = mapUserToPublic(user);
    const accessToken = signAccessToken({
      sub: publicUser.id,
      email: publicUser.email,
      role: publicUser.role,
    });
    const refreshToken = signRefreshToken({
      sub: publicUser.id,
      sessionId,
    });

    return {
      user: publicUser,
      accessToken,
      refreshToken,
      remember: input.remember ?? false,
    };
  },

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const sessionUserId = await getSessionUserId(payload.sessionId);

    if (!sessionUserId || sessionUserId !== payload.sub) {
      throw new ApiError(401, "Session expired");
    }

    const user = await userRepository.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const publicUser = mapUserToPublic(user);
    const accessToken = signAccessToken({
      sub: publicUser.id,
      email: publicUser.email,
      role: publicUser.role,
    });

    return { user: publicUser, accessToken };
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      return;
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      await revokeSession(payload.sessionId);
    } catch {
      return;
    }
  },

  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return mapUserToPublic(user);
  },

  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return { message: "If the account exists, reset instructions were sent." };
    }

    const token = randomUUID();
    const redis = getRedisClient();
    await redis.set(`${RESET_PREFIX}${token}`, user._id.toString(), "EX", 60 * 60);

    if (env.isDevelopment) {
      console.info(`[dev] Password reset token for ${email}: ${token}`);
    }

    return { message: "If the account exists, reset instructions were sent." };
  },

  async resetPassword(token: string, password: string) {
    const redis = getRedisClient();
    const userId = await redis.get(`${RESET_PREFIX}${token}`);

    if (!userId) {
      throw new ApiError(400, "Invalid or expired reset token");
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.passwordHash = await bcrypt.hash(password, 12);
    await user.save();
    await redis.del(`${RESET_PREFIX}${token}`);

    return { message: "Password updated successfully" };
  },

  setRefreshCookie,
  clearRefreshCookie,
  getRefreshCookieName() {
    return REFRESH_COOKIE;
  },
};
