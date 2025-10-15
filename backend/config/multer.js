import multer from "multer";

const storage = multer.memoryStorage(); // store image in memory (for buffer upload)
export const upload = multer({ storage });
