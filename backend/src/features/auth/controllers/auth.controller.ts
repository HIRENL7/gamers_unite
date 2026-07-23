import type { Request, Response } from "express";

import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { requireAuth } from "../../../shared/middleware/validate.js";
import {
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resetPasswordBodySchema,
} from "../schemas/auth.schema.js";
import { authService } from "../services/auth.service.js";
import { validateRequest } from "../../../shared/middleware/validate.js";

export const register = asyncHandler(async (request: Request, response: Response) => {
  const result = await authService.register(request.body);
  authService.setRefreshCookie(response, result.refreshToken);
  response.status(201).json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const login = asyncHandler(async (request: Request, response: Response) => {
  const result = await authService.login(request.body);
  authService.setRefreshCookie(response, result.refreshToken, result.remember);
  response.json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const refresh = asyncHandler(async (request: Request, response: Response) => {
  const refreshToken =
    request.cookies?.[authService.getRefreshCookieName()] ??
    (typeof request.body?.refreshToken === "string" ? request.body.refreshToken : undefined);

  if (!refreshToken) {
    response.status(401).json({ success: false, message: "Refresh token missing" });
    return;
  }

  const result = await authService.refresh(refreshToken);
  response.json({
    success: true,
    data: result,
  });
});

export const logout = asyncHandler(async (request: Request, response: Response) => {
  const refreshToken = request.cookies?.[authService.getRefreshCookieName()];
  await authService.logout(refreshToken);
  authService.clearRefreshCookie(response);
  response.json({ success: true, message: "Logged out" });
});

export const me = asyncHandler(async (request: Request, response: Response) => {
  const user = await authService.getCurrentUser(request.auth!.sub);
  response.json({ success: true, data: { user } });
});

export const forgotPassword = asyncHandler(async (request: Request, response: Response) => {
  const result = await authService.forgotPassword(request.body.email);
  response.json({ success: true, data: result });
});

export const resetPassword = asyncHandler(async (request: Request, response: Response) => {
  const result = await authService.resetPassword(request.body.token, request.body.password);
  response.json({ success: true, data: result });
});

export const authValidators = {
  register: validateRequest(registerBodySchema),
  login: validateRequest(loginBodySchema),
  forgotPassword: validateRequest(forgotPasswordBodySchema),
  resetPassword: validateRequest(resetPasswordBodySchema),
  me: requireAuth,
};
