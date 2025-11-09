import {
  BadRequestException,
  UnauthorizedException,
} from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
// import { sendEmail } from "../common/node-mailler/init.node-mailler.js";

export const authService = {
  register: async function (req) {
    const { email, password, fullName, age } = req.body;
    const userExist = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập"
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);
// console.log('age', age);

    const userNew = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        fullName,
        age
      },
    });

    // console.log({ userNew });
    return {
      id: userNew.id,
      email: userNew.email,
    };
  },

  login: async function (req) {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException(
        "Người dùng chưa tồn tại, vui lòng đăng ký"
      );
    }

    if (!password) {
      throw new BadRequestException(
        "Bạn chưa tạo mật khẩu, hãy đăng nhập bằng google"
      );
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Mật khẩu không đúng");
    }

    const tokens = tokenService.createTokens(user.id);

    //  console.log({ email, password, user });
    // sendEmail("nongquoctoan.dev@gmail.com");
    return tokens;
  },

  googleCallback: async function (req) {
    const { accessToken, refreshToken } = tokenService.createTokens(
      req.user.id
    );
    return `http://localhost:3000/login-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;
  },

  getInfo: async function (req) {
    // console.log('user', user);

    const user = req.user;
    delete user.password;
    return user;
  },

  // refreshToken: async function (req) {
  //   const { accessToken, refreshToken } = req.body;
  //   const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
  //     ignoreExpiration: true,
  //   });
  //   const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

  //   if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
  //     throw new UnauthorizedException("Unauthorized: Token khong hop le");
  //   }

  //   const userExits = await prisma.users.findUnique({
  //     where: {
  //       id: decodeAccessToken.userId,
  //     },
  //   });

  //   if (!userExits) {
  //     throw new UnauthorizedException("Unauthorized: User không tồn tại");
  //   }

  //   // TH1: trả cả 2 token trong 7 ngày không đăng nhập login lại nếu 2,3 ngày đăng nhập -> ko cần đăng nhập lại
  //   const token = tokenService.createTokens(userExits.id);
  //   // TH2: chỉ trả về accessToken

  //   console.log({
  //     accessToken,
  //     refreshToken,
  //     decodeAccessToken,
  //     decodeRefreshToken,
  //   });

  //   return token;
  // },
};
