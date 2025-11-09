import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constant/app.constant.js";
import prisma from "../prisma/connect.prisma.js";
import { BadRequestException } from "../helpers/exception.helper.js";

export const initStrategyGoogleOauth20 = () => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;
        const avatar = profile.photos[0].value;
        const googleId = profile.id;

        let userExits = await prisma.users.findUnique({
          where: {
            email,
          },
        });

        if (!userExits) {
          userExits = await prisma.users.create({
            data: {
              email,
              fullName,
              avatar,
              googleId,
            },
          });
        }

        console.dir(
          { userExits, accessToken, refreshToken, profile, cb },
          { colors: true, depth: null }
        );
        // thành công
        return cb(null, userExits);
      }
    )
  );
};

// export default initStrategyGoogleOauth20;
