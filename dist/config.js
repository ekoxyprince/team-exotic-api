"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.NODE_ENV == "development"
        ? process.env.LOCAL_DATABASE
        : process.env.REMOTE_DATABASE,
    jwt_secret: process.env.JWT_SECRET,
    server_url: process.env.NODE_ENV == "development"
        ? process.env.LOCAL_SERVER
        : process.env.REMOTE_SERVER,
    stripe_sk: process.env.STRIPE_SK,
    client_url: process.env.NODE_ENV == "development"
        ? process.env.LOCAL_CLIENT
        : process.env.REMOTE_CLIENT,
    split_val: process.env.NODE_ENV == "development" ? 12 : 13,
    image_path: process.env.NODE_ENV == "development"
        ? "./src/public/uploads/"
        : "./dist/public/uploads/",
    email: process.env.EMAIL,
    email_host: process.env.EMAIL_HOST,
    email_pass: process.env.EMAIL_PASS
};
