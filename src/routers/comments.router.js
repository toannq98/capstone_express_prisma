import express from "express";
import { commentsController } from "../controllers/comments.controller.js";
import protect from "../common/middlewares/protect.middlewares.js";

const commentsRouter = express.Router();

// Tạo route CRUD
commentsRouter.post("/", protect, commentsController.create);
commentsRouter.get(
  "/:imageId",
  protect,
  commentsController.findCommentWithIdImage
);

export default commentsRouter;
