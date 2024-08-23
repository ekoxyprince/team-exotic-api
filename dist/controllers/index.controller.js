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
exports.sendMessageToAdmin = exports.createUserPayment = exports.findById = exports.findAllClients = exports.testStripe = exports.findUser = exports.findOrCreateUser = exports.createUserForOrder = exports.findOtherCarsExcept = exports.deleteBrand = exports.findAllBrands = exports.findSingleBrand = exports.updateBrand = exports.createBrand = exports.findByFilter = exports.deleteSingleCar = exports.updateSingleCar = exports.getSingleCar = exports.getCarsPaginated = exports.getCars = exports.createCar = void 0;
const car_services_1 = __importDefault(require("../services/carservices/car.services"));
const brand_services_1 = __importDefault(require("../services/carservices/brand.services"));
const catchasync_1 = __importDefault(require("../utilities/catchasync"));
const client_services_1 = __importDefault(require("../services/userservices/client.services"));
const payment_services_1 = __importDefault(require("../services/paymentservices/payment.services"));
const order_services_1 = __importDefault(require("../services/carservices/order.services"));
const config_1 = __importDefault(require("../config"));
const mail_1 = __importDefault(require("../helpers/mail"));
exports.createCar = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carService = new car_services_1.default(req.body, req.files);
    const data = yield carService.create();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Created successfully!",
        data,
    });
}));
exports.getCars = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.findAll(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Fetched successfully!",
        data,
    });
}));
exports.getCarsPaginated = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.findWithPagination(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Fetched successfully!",
        data,
    });
}));
exports.getSingleCar = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.findById(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Fetched successfully!",
        data,
    });
}));
exports.updateSingleCar = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carService = new car_services_1.default(req.body);
    const data = yield carService.update(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Updated successfully!",
        data,
    });
}));
exports.deleteSingleCar = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.delete(req.params.id);
    res.status(204).json({
        success: true,
        status: 204,
        message: "Updated successfully!",
        data,
    });
}));
exports.findByFilter = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.findByFilter(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "fetched successfully!",
        data,
    });
}));
exports.createBrand = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new brand_services_1.default(req.body, req.file).saveBrand();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Brand created",
        data,
    });
}));
exports.updateBrand = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new brand_services_1.default(req.body, req.file).updateBrand(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Brand updated",
        data,
    });
}));
exports.findSingleBrand = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield brand_services_1.default.findSingleBrand(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Brand found!",
        data,
    });
}));
exports.findAllBrands = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield brand_services_1.default.findAllBrands();
    res.status(200).json({
        success: true,
        status: 200,
        message: "Brand found!",
        data,
    });
}));
exports.deleteBrand = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield brand_services_1.default.deleteBrand(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Brand deleted!",
        data,
    });
}));
exports.findOtherCarsExcept = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield car_services_1.default.findOtherCarsExcept(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Cars Found!",
        data,
    });
}));
exports.createUserForOrder = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new client_services_1.default(req.body, req.files).create();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Client created",
        data,
    });
}));
exports.findOrCreateUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new client_services_1.default(req.body, req.files).findOrCreateClient();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Client created or found!",
        data,
    });
}));
exports.findUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client_services_1.default.findClient(req.params.driverLicenseNumber);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Client found!",
        data,
    });
}));
exports.testStripe = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new order_services_1.default(req.body, req.files).createOrder();
    console.log(data);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Payment started!",
        data: {
            authorization_url: data.url,
        },
    });
}));
exports.findAllClients = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client_services_1.default.findByFilter(req.query);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Clients found!",
        data,
    });
}));
exports.findById = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client_services_1.default.findById(req.params.id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Client found!",
        data,
    });
}));
exports.createUserPayment = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield payment_services_1.default.createUserPayment(req.query.session_id);
    let redirectQuery = data.status == "paid" ? "success" : "failed";
    res
        .status(303)
        .redirect(`${config_1.default.client_url}/payment?status=${redirectQuery}`);
}));
exports.sendMessageToAdmin = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, name, phone, email } = req.body;
    const data = yield mail_1.default.adminSiteMail(name, email, phone, message);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Email sent",
        data: null,
    });
}));
