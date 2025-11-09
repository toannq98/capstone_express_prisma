import express from "express";
import { usersController } from "../controllers/user.controller.js";
import protect from "../common/middlewares/protect.middlewares.js";
import { uploadMemoryClound } from "../common/multer/memory-clound.multer.js";
const usersRouter = express.Router();

// Tạo route CRUD
usersRouter.get("/info", protect, usersController.findInfor);
usersRouter.put(
  "/",
  protect,
  uploadMemoryClound.single("avatar"),
  usersController.update
);

export default usersRouter;
