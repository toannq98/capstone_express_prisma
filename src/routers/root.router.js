import express from "express";
import authRouter from "./auth.router.js";
import imagesRouter from "./images.router.js";
import commentsRouter from "./comments.router.js";
import usersRouter from "./users.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/images", imagesRouter);
rootRouter.use("/comments", commentsRouter);
rootRouter.use("/users", usersRouter);

export default rootRouter;
