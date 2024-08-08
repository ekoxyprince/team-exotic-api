"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signin = void 0;
const catchasync_1 = __importDefault(require("../utilities/catchasync"));
const auth_services_1 = __importDefault(require("../services/userservices/auth.services"));
exports.signin = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new auth_services_1.default().signin(req["body"]);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Signin successful",
        data,
    });
}));
exports.forgotPassword = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new auth_services_1.default().forgotPassword(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Reset Token generated",
        data,
    });
}));
exports.resetPassword = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new auth_services_1.default().resetPassword(Object.assign(Object.assign({}, req["body"]), req["params"]));
    res.status(200).json({
        success: true,
        status: 200,
        message: "Password reset successful",
        data,
    });
}));
