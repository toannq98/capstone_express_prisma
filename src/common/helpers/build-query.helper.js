export const buildQuery = (query) => {
  let { page, pageSize, filters } = query;
// console.log('query', query);

  // xử lý filter
  filters = JSON.parse(filters || "{}") || {};

  for (const [key, value] of Object.entries(filters)) {
    if (typeof value === "string") {
      filters[key] = {
        contains: value,
      };
    }
  }
  // chức năng của hàm max là lấy số lớn nhất
  const pageDefault = 1;
  const pageSizeDefault = 3;
  page = Math.max(1, Number(page) || pageDefault);
  pageSize = Math.max(Number(pageSize) || pageSizeDefault);

  // console.log({ page, pageSize });

  const index = (page - 1) * pageSize;

  return { page, pageSize, filters, index };
};
