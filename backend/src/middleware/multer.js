import multer from "multer"

const storage = new multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");