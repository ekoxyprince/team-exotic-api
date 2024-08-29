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
const payment_services_1 = __importDefault(require("../paymentservices/payment.services"));
const client_services_1 = __importDefault(require("../userservices/client.services"));
const order_model_1 = __importDefault(require("../../database/models/order.model"));
const car_services_1 = __importDefault(require("./car.services"));
const _ = require("lodash");
const mail_1 = __importDefault(require("../../helpers/mail"));
class OrderService {
    constructor(body, files) {
        this.body = body;
        this.files = files;
        this.body = body;
        this.files = files;
    }
    createOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientService = new client_services_1.default(this.body, this.files);
            const client = yield clientService.findOrCreateClient();
            if (client.status !== "verified") {
                yield mail_1.default.registration(client.firstname, client.email);
                yield mail_1.default.adminVerification();
            }
            const car = (yield car_services_1.default.findById(this.body.id));
            const order = yield order_model_1.default.create(Object.assign(Object.assign({}, this.body), { client: client._id, car: car._id, totalAmount: (car.price * this.body.interval) + (car.price * this.body.interval) * 0.1288 }));
            yield mail_1.default.orderPlacement(client.firstname, client.email, car.name);
            yield mail_1.default.adminOrderVerification(car.name);
            const paymentData = Object.assign(Object.assign({}, _.pick(car, ["name", "price"])), { orderId: order._id, clientId: client._id, clientName: client.firstname, clientEmail: client.email });
            paymentData['price'] *= this.body.interval;
            paymentData["price"] += paymentData["price"] * 0.1288 + 1000;
            paymentData["price"] = Math.ceil(paymentData["price"] * 100);
            const paymentService = new payment_services_1.default(paymentData);
            const payment = yield paymentService.createStripePaymentSession();
            return payment;
        });
    }
    static findByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            const page = filter.pages;
            const limit = filter.limit;
            let filterObj = filter;
            let excludedFields = ["page", "limit"];
            excludedFields.forEach((el) => delete filterObj[el]);
            if (filterObj.status) {
                query["status"] = filterObj.status;
            }
            const totalCount = yield order_model_1.default.countDocuments(query);
            const orders = yield order_model_1.default.find(query)
                .sort("-createdAt")
                .populate("car", "name images")
                .populate("client", "firstname lastname");
            return {
                total_order: totalCount,
                orders: orders,
                page: page,
                pages: Math.ceil(totalCount / limit),
                limit: limit,
            };
        });
    }
    static findById(id) {
        return order_model_1.default.findById(id)
            .sort("-createdAt")
            .populate("car", "name images")
            .populate("client", "firstname lastname")
            .then((order) => order)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findAndUpdate(id, body) {
        return order_model_1.default.findByIdAndUpdate(id, body)
            .then((order) => undefined)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findAndDelete(id) {
        return order_model_1.default.findByIdAndDelete(id)
            .then((order) => undefined)
            .catch((error) => {
            throw new Error(error);
        });
    }
}
exports.default = OrderService;
