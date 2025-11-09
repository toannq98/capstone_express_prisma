import { responseSuccess } from "../common/helpers/function.helpler.js";
import { imagesService } from "../services/images.service.js";

export const imagesController = {
  findAll: async function (req, res, next) {
    const result = await imagesService.findAll(req);
    const response = responseSuccess(result, `Get all images successfully`);
    res.status(response.statusCode).json(response);
  },

  findOne: async function (req, res, next) {
    const result = await imagesService.findOne(req);
    const response = responseSuccess(
      result,
      `Get images #${req.params.id} successfully`
    );
    res.status(response.statusCode).json(response);
  },

  toggleSave: async function (req, res, next) {
    const result = await imagesService.toggleSave(req);
    console.log("result", result);
    const response = responseSuccess(result.data, result.message);
    res.status(response.statusCode).json(response);
  },

  findImagesSaveByUser: async function (req, res, next) {
    const result = await imagesService.findImagesSaveByUser(req);
    const response = responseSuccess(
      result,
      `findImagesSaveByUser successfully`
    );
    res.status(response.statusCode).json(response);
  },

  findImagesCreatedByUser: async function (req, res, next) {
    const result = await imagesService.findImagesCreatedByUser(req);
    const response = responseSuccess(
      result,
      `findImagesCreatedByUser successfully`
    );
    res.status(response.statusCode).json(response);
  },
  delete: async function (req, res, next) {
    const result = await imagesService.delete(req);
    const response = responseSuccess(result, `Delete Images successfully`);
    res.status(response.statusCode).json(response);
  },
  addImage: async function (req, res, next) {
    const result = await imagesService.addImage(req);
    const response = responseSuccess(result, `Add Images successfully`);
    res.status(response.statusCode).json(response);
  },
};
