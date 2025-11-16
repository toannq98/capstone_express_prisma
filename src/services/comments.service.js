import { buildQuery } from "../common/helpers/build-query.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const commentsService = {
  create: async function (req) {
    //   console.log('req', req);

    const { id: userId } = req.user;
    const { imageId, content } = req.body;

    const comment = await prisma.comments.create({
      data: {
        userId,
        imageId,
        content,
      },
    });

    return comment;
  },

  findCommentByImageId: async (req) => {
    const { page, pageSize, filters, index } = buildQuery(req.query);

    const imagesPromise = prisma.comments.findMany({
      where: filters,
      skip: index,
      take: pageSize,
    });

    const totalItemPromise = prisma.comments.count({ where: filters });

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
};
