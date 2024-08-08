"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = (url) => {
    return mongoose_1.default
        .connect(url, { dbName: 'rentalsdb1' })
        .then((connected) => {
        console.log("Connected to database");
        return connected;
    })
        .catch((error) => {
        throw new Error(error);
    });
};
exports.default = connectToDb;
