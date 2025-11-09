import { responseSuccess } from "../common/helpers/function.helpler.js";
import { usersService } from "../services/user.service.js";

export const usersController = {
  findInfor: async function (req, res, next) {
    const result = await usersService.findInfor(req);
    const response = responseSuccess(result, `Get user info successfully`);
    res.status(response.statusCode).json(response);
  },

  update: async function (req, res, next) {
    const result = await usersService.update(req);
    const response = responseSuccess(
      result,
      `Update users #${req.params.id} successfully`
    );
    res.status(response.statusCode).json(response);
  },
};
