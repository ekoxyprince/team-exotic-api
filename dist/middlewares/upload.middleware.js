"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config_1.default.image_path);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/webp") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.default = (0, multer_1.default)({ storage: fileStorageEngine, fileFilter });
