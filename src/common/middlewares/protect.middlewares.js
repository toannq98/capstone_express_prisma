import tokenService from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import prisma from "../prisma/connect.prisma.js";

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedException("authorization is missing");
  }
  const [type, accessToken] = authorization.split(" ");
  if (type !== "Bearer") {
    throw new UnauthorizedException(
      "Invalid authorization format. Expected 'Bearer <token>'"
    );
  }

  if (!accessToken) {
    throw new UnauthorizedException("Access token is missing");
  }

  const { userId } = tokenService.verifyAccessToken(accessToken);
  const userExist = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!userExist) {
    throw new UnauthorizedException("User don't exits");
  }

  req.user = userExist;
//   console.log({ type, accessToken, userExist });
  next();
};

export default protect;
