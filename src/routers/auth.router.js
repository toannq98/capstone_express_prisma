import express from "express";
import { authController } from "../controllers/auth.controller.js";
import protect from "../common/middlewares/protect.middlewares.js";
import passport from "passport";
import { checkPermision } from "../common/middlewares/check-permision.middleware.js";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", protect, checkPermision, authController.getInfo);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.googleCallback
);

export default authRouter;
