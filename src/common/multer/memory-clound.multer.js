import multer from "multer";

const storage = multer.memoryStorage()
export const uploadMemoryClound = multer({ storage: storage })