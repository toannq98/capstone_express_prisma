import { BadRequestException } from "../helpers/exception.helper.js";
import prisma from "../prisma/connect.prisma.js";

// chỉ sử dụng được khi có middleware đằng trước để biết được ai gọi api và họ có quyền gì
export const checkPermision = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new BadRequestException("chưa có protect, thêm protect đằng trước");
  }
  if (user.roleId === 1) {
    next();
    return;
  }
  const method = req.method;
  const endpoint = req.baseUrl + req.route?.path;

  const permision = await prisma.rolePermission.findFirst({
    where: {
      roleId: user.roleId,
      Permissions: {
        method,
        endpoint,
      },
      isActive: true,
    },
  });

  if (!permision) {
    console.log({ method, endpoint, userId: user.roleId });

    throw new BadRequestException("người dùng ko đủ quyền");
  }

  console.log("checkPermision", { user, method, endpoint });
  next();
};
