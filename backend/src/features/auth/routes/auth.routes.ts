import { Router } from "express";

import {
  authValidators,
  forgotPassword,
  login,
  logout,
  me,
  refresh,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authValidators.register, register);
authRouter.post("/login", authValidators.login, login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.get("/me", authValidators.me, me);
authRouter.post("/forgot-password", authValidators.forgotPassword, forgotPassword);
authRouter.post("/reset-password", authValidators.resetPassword, resetPassword);

export { authRouter };
