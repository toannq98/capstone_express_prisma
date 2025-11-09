import express from "express";
import { imagesController } from "../controllers/images.controller.js";
import protect from "../common/middlewares/protect.middlewares.js";
import { uploadMemoryClound } from "../common/multer/memory-clound.multer.js";

const imagesRouter = express.Router();

imagesRouter.get(
  "/find-images-saved-by-user",
  protect,
  imagesController.findImagesSaveByUser
);
imagesRouter.get(
  "/find-images-created-by-user",
  protect,
  imagesController.findImagesCreatedByUser
);

imagesRouter.post("/:id/toogle-save", protect, imagesController.toggleSave);
imagesRouter.get("/", protect, imagesController.findAll);
imagesRouter.get("/:id", protect, imagesController.findOne);
imagesRouter.delete("/:id", protect, imagesController.delete);
imagesRouter.post(
  "/",
  protect,
  uploadMemoryClound.single("image"),
  imagesController.addImage
);

export default imagesRouter;
