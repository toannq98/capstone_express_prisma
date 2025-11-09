import { responseSuccess } from "../common/helpers/function.helpler.js";
import { commentsService } from "../services/comments.service.js";

export const commentsController = {
  create: async function (req, res, next) {
    const result = await commentsService.create(req);
    const response = responseSuccess(result, `Create comments successfully`);
    res.status(response.statusCode).json(response);
  },

  findCommentByImageId: async function (req, res, next) {
    const result = await commentsService.findCommentByImageId(req);
    const response = responseSuccess(
      result,
      `findCommentWithIdImage commentss successfully`
    );
    res.status(response.statusCode).json(response);
  },
};
