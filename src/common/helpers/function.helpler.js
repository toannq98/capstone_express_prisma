export const responseSuccess = (data, message = "ok", statusCode = 200) => {
  return {
    status: "success",
    statusCode,
    message,
    data,
  };
};

export const responseError = (
  message = "Internal Server Error",
  statusCode = 500,
  stack
) => {
  return {
    status: "error",
    statusCode,
    message,
    stack,
  };
};
