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
exports.fetchDashboardData = exports.deletePayment = exports.getPayments = exports.verifyUser = exports.findAndDeleteOrder = exports.findAndUpdateOrder = exports.findSingleOrder = exports.findAllOrders = exports.updateAdminDetails = exports.getAdminDetails = void 0;
const catchasync_1 = __importDefault(require("../utilities/catchasync"));
const user_services_1 = __importDefault(require("../services/userservices/user.services"));
const order_services_1 = __importDefault(require("../services/carservices/order.services"));
const client_services_1 = __importDefault(require("../services/userservices/client.services"));
const payment_services_1 = __importDefault(require("../services/paymentservices/payment.services"));
exports.getAdminDetails = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new user_services_1.default(req.user).getDetails();
    res.status(200).json({
        success: true,
        status: 200,
        message: "success",
        data,
    });
}));
exports.updateAdminDetails = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new user_services_1.default(req.user).updateDetails(req.body, req.files);
    res.status(204).json({
        success: true,
        status: 204,
        message: "updated successfully!",
        data,
    });
}));
exports.findAllOrders = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_services_1.default.findByFilter(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Orders found!",
        data,
    });
}));
exports.findSingleOrder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_services_1.default.findById(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Order found!",
        data,
    });
}));
exports.findAndUpdateOrder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_services_1.default.findAndUpdate(req.params.id, req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Order updated!",
        data,
    });
}));
exports.findAndDeleteOrder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_services_1.default.findAndDelete(req.params.id);
    res.status(204).json({
        success: true,
        status: 204,
        message: "Order deleted!",
        data,
    });
}));
exports.verifyUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client_services_1.default.findAndUpdate(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Client updated!",
        data,
    });
}));
exports.getPayments = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield payment_services_1.default.fetchAllPayments(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Payments found!",
        data,
    });
}));
exports.deletePayment = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield payment_services_1.default.deletePayment(req.params.id);
    res.status(204).json({
        success: true,
        status: 204,
        message: "Payment deleted!",
        data,
    });
}));
exports.fetchDashboardData = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new user_services_1.default(req.user).getDashboardDetails();
    res.status(200).json({
        success: true,
        status: 200,
        message: "Details found!",
        data,
    });
}));
