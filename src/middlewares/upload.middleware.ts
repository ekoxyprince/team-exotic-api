import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import config from "../config";
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const fileStorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null,config.image_path);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FilenameCallback
  ): void => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"  ||
    file.mimetype == "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage: fileStorageEngine, fileFilter });
