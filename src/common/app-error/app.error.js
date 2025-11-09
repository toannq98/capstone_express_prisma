import jwt from "jsonwebtoken";
import { responseError } from "../helpers/function.helpler.js";
import { statusCodes } from "../helpers/status-code.helper.js";
//mid đặc biệt chỉ tồn tại 1 lần(để sử lý lỗi tập chung)
export const appError = (err, req, res, next) => {
  console.log("app err", err);


   if (err instanceof jwt.JsonWebTokenError) {
    // throw new ForbiddenException("forbidden")
    err.code = statusCodes.UNAUTHORIZED;
  }
  if (err instanceof jwt.TokenExpiredError) {
    // throw new ForbiddenException("forbidden")
    err.code = statusCodes.FORBIDDEN;
  }

  const response = responseError(err.message, err.code, err.stack);
  res.status(response.statusCode).json(response);
};
