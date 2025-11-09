import { statusCodes } from "./status-code.helper.js";

export class BadRequestException extends Error {
  constructor(message = "BadRequestException") {
    super(message);
    this.code = statusCodes.BAD_REQUEST;
  }
}
// 401 --> logout
export class UnauthorizedException extends Error {
  constructor(message = "UnauthorizedException") {
    super(message);
    this.code = statusCodes.UNAUTHORIZED;
  }
}
// 403 --> refresh token
export class ForbiddenException extends Error {
  constructor(message = "ForbiddenException") {
    super(message);
    this.code = statusCodes.FORBIDDEN;
  }
}
