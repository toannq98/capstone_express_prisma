import fs from "fs";
import path from "path";
import cloudinary from "../common/cloudinary/init.cloudinary.js";
import prisma from "../common/prisma/connect.prisma.js";

export const usersService = {
  findInfor: async function (req) {
    const user = req.user;
    return user;
  },

  update: async function (req) {
    const { fullName, age } = req.body;
    console.log({ fullName, age });

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "demo" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });

    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: uploadResult.public_id,
        fullName,
        age: +age,
      },
    });

    // đảm bảo 1 user - 1 avatar => xoá hình cũ
    if (req.user.avatar) {
      cloudinary.uploader.destroy(req.user.avatar);
    }

    console.log({ uploadResult });
    return true;
  },
};
