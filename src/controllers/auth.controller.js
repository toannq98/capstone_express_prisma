import { responseSuccess } from "../common/helpers/function.helpler.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  register: async function (req, res, next) {
    const result = await authService.register(req);
    const response = responseSuccess(result, `Register auth successfully`);
    res.status(response.statusCode).json(response);
  },
  login: async function (req, res, next) {
    const result = await authService.login(req);
    const response = responseSuccess(result, `Login auth successfully`);
    res.status(response.statusCode).json(response);
  },

  googleCallback: async function (req, res, next) {
    const result = await authService.googleCallback(req);
    // const response = responseSuccess(result, `Login google successfully`);
    res.redirect(result);
    // res.status(response.statusCode).json(response);
  },

  getInfo: async function (req, res, next) {
    const result = await authService.getInfo(req);
    const response = responseSuccess(result, `Get info auth successfully`);
    res.status(response.statusCode).json(response);
  },

  // refreshToken: async function (req, res, next) {
  //   const result = await authService.refreshToken(req);
  //   const response = responseSuccess(result, `Refresh token successfully`);
  //   res.status(response.statusCode).json(response);
  // },
};
