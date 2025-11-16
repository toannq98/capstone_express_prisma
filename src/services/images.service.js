import cloudinary from "../common/cloudinary/init.cloudinary.js";
import { buildQuery } from "../common/helpers/build-query.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import fs from "fs";

export const imagesService = {
  findAll: async (req) => {
    const { page, pageSize, filters, index } = buildQuery(req.query);

    const imagesPromise = prisma.images.findMany({
      where: filters,
      skip: index,
      take: pageSize,
    });

    const totalItemPromise = prisma.images.count({ where: filters });

    const [images, totalItem] = await Promise.all([
      imagesPromise,
      totalItemPromise,
    ]);

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem,
      totalPage,
      items: images || [],
    };
  },

  findOne: async function (req) {
    const { id } = req.params;
    const { id: userId } = req.user;

    if (!userId) {
      throw new BadRequestException("Không tìm thấy user");
    }
    const [image, saved] = await Promise.all([
      prisma.images.findUnique({
        where: { id: +id },
        include: {
          Users: {
            select: { id: true, email: true, fullName: true, avatar: true },
          },
        },
      }),
      prisma.imagesSave.findFirst({
        where: {
          userId,
          imageId: +id,
          isDeleted: false,
        },
      }),
    ]);

    if (!image) {
      throw new BadRequestException("Không tìm thấy hình ảnh");
    }
    // Đổi key thành chữ thường
    const { Users: user, Comments: comments, ...rest } = image;
    return {
      ...rest,
      isSaved: !!saved,
      user,
      comments,
    };
  },

  toggleSave: async function (req) {
    const { id } = req.params; // imageId
    const userId = req.user.id;

    // Kiểm tra xem đã lưu chưa
    const existing = await prisma.imagesSave.findFirst({
      where: {
        userId,
        imageId: +id,
        isDeleted: false,
      },
    });

    if (existing) {
      // Nếu đã lưu → bỏ lưu (xóa mềm)
      await prisma.imagesSave.update({
        where: { id: existing.id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      });

      return {
        message: "Bỏ lưu hình ảnh thành công",
        data: {
          isSaved: false,
        },
      };
    } else {
      // Nếu chưa lưu → tạo mới
      await prisma.imagesSave.create({
        data: {
          userId,
          imageId: +id,
        },
      });

      return {
        message: "Lưu hình ảnh thành công",
        data: { isSaved: true },
      };
    }
  },
  findImagesSaveByUser: async function (req) {
    const { id: userId } = req.user;
    const images = await prisma.images.findMany({
      where: {
        ImagesSave: {
          some: {
            userId: userId,
          },
        },
      },
    });
    return images;
  },
  findImagesCreatedByUser: async function (req) {
    const { id: userId } = req.user;

    const images = await prisma.images.findMany({
      where: {
        userId: userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return images;
  },
  delete: async function (req) {
    const { id: imageId } = req.params; // imageId
    const { id: userId } = req.user;

    const image = await prisma.images.findUnique({
      where: { id: Number(imageId) },
    });

    if (!image) {
      throw new BadRequestException("Ảnh không tồn tại");
    }

    // 2️⃣ Tiến hành xóa (xóa mềm hoặc xóa hẳn tùy bạn)
    await prisma.images.update({
      where: { id: Number(imageId) },
      data: {
        isDeleted: true,
        deletedBy: userId,
        deletedAt: new Date(),
      },
    });

    return { imageId: Number(imageId) };
  },
  addImage: async function (req) {
    const { id: userId } = req.user;
    const { name, desc } = req.body;
    // console.log({ file: req.file, userId, title, desc });
    // const byteArrayBuffer = fs.readFileSync("shirt.jpg");
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

    await prisma.images.create({
      data: {
        userId,
        name,
        desc,
        url: uploadResult.public_id,
      },
    });

    // console.log({ uploadResult });
    return {
      publicId: uploadResult.public_id,
    };
  },
};
