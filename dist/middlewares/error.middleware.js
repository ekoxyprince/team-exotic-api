"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
const error_1 = require("../exceptions/error");
exports.default = (error, req, res, next) => {
    var _a, _b, _c;
    console.log(error);
    const statusCode = error.code || 500;
    res.status(statusCode).json({
        success: false,
        status: "error",
        code: statusCode,
        data: {
            msg: error.message,
            stack: process.env.NODE_ENV == "development" ? error.stack : null,
            value: (_a = error.details) === null || _a === void 0 ? void 0 : _a.value,
            path: (_b = error.details) === null || _b === void 0 ? void 0 : _b.path,
            field: (_c = error.details) === null || _c === void 0 ? void 0 : _c.field,
        },
    });
};
const notFoundError = (req, res) => {
    throw new error_1.NotfoundError("Page not found", {
        path: req.path,
        value: req.url,
        field: "url",
    });
};
exports.notFoundError = notFoundError;
