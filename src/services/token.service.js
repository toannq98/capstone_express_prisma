import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";

const tokenService = {
  createTokens: (userId) => {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    //   expiresIn: "7d",
    // });
    return {
      accessToken,
      // refreshToken,
    };
  },
  // createTokens: (userId) => {
  //   const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
  //     expiresIn: "5s",
  //   });
  //   return {
  //     accessToken,
  //   };
  // },
  verifyAccessToken: (accessToken, option) => {
    const decodeAccessToken = jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
      option
    );
    return decodeAccessToken;
  },
  verifyRefreshToken: (refreshToken) => {
    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return decodeRefreshToken;
  },
};

export default tokenService;
