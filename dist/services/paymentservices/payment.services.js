"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.stripe_sk);
const error_1 = require("../../exceptions/error");
const payment_model_1 = __importDefault(require("../../database/models/payment.model"));
const client_model_1 = __importDefault(require("../../database/models/client.model"));
const order_model_1 = __importStar(require("../../database/models/order.model"));
const car_model_1 = __importStar(require("../../database/models/car.model"));
const mail_1 = __importDefault(require("../../helpers/mail"));
class PaymentService {
    constructor(body) {
        this.body = body;
        this.body = body;
    }
    createCustomer() {
        return stripe.customers.create({
            name: this.body.clientName,
            email: this.body.clientEmail,
            metadata: {
                id: this.body.clientId,
            },
        });
    }
    createStripePaymentSession() {
        console.log(this.body);
        return stripe.checkout.sessions
            .create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: this.body.name,
                        },
                        unit_amount: this.body.price,
                    },
                    quantity: 1,
                },
            ],
            customer_email: this.body.clientEmail,
            client_reference_id: this.body.orderId.toString(),
            mode: "payment",
            success_url: `${config_1.default.server_url}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config_1.default.server_url}/api/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
        })
            .then((session) => session)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static verifyStripePaymentSession(session_id) {
        return stripe.checkout.sessions
            .retrieve(session_id)
            .then((session) => {
            if (!session)
                throw new error_1.AuthorizationError("No session found");
            return session;
        })
            .catch((error) => {
            if (error instanceof error_1.AuthorizationError) {
                throw new error_1.AuthorizationError(error.message);
            }
        });
    }
}
_a = PaymentService;
PaymentService.createUserPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentSession = (yield _a.verifyStripePaymentSession(id));
        if (!paymentSession)
            throw new Error("Invalid payment session");
        const client = yield client_model_1.default.findOne({
            email: paymentSession.customer_email,
        });
        if (!client)
            throw new Error("Invalid payment session");
        const payment = yield payment_model_1.default.create({
            session_id: paymentSession.id,
            clientName: `${client.firstname} ${client.lastname}`,
            order: paymentSession.client_reference_id,
            status: paymentSession.payment_status,
            amount: paymentSession.amount_total,
        });
        const order = yield order_model_1.default.findById(payment.order);
        order["paymentStatus"] =
            paymentSession.payment_status == "paid"
                ? order_model_1.PaymentStatus.COMPLETED
                : order_model_1.PaymentStatus.PENDING;
        order["orderStatus"] =
            paymentSession.payment_status == "paid"
                ? order_model_1.OrderStatus.BOOKED
                : order_model_1.OrderStatus.LIVE;
        yield (order === null || order === void 0 ? void 0 : order.save());
        const car = yield car_model_1.default.findById(order === null || order === void 0 ? void 0 : order.car);
        car["status"] =
            paymentSession.payment_status == "paid" ? car_model_1.Status.BOOKED : car_model_1.Status.ACTIVE;
        yield (car === null || car === void 0 ? void 0 : car.save());
        yield mail_1.default.userPayment(car === null || car === void 0 ? void 0 : car.name, client.firstname, client.email, paymentSession.payment_status);
        yield mail_1.default.adminUserPayment(car === null || car === void 0 ? void 0 : car.name, paymentSession.payment_status);
        return { status: paymentSession.payment_status };
    }
    catch (error) {
        const err = error;
        throw new Error(err.message);
    }
});
PaymentService.fetchAllPayments = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        let filterObj = filter;
        let excludedFields = ["page", "limit"];
        excludedFields.forEach((el) => delete filterObj[el]);
        if (filterObj.q) {
            query["clientName"] = {
                $regex: new RegExp(filterObj.q),
                $options: "i",
            };
        }
        const payments = yield payment_model_1.default.find(query).sort("-createdAt");
        return payments;
    }
    catch (error) {
        const err = error;
        throw new Error(err.message);
    }
});
PaymentService.deletePayment = (id) => {
    return payment_model_1.default.findByIdAndDelete(id)
        .then((payment) => void payment)
        .catch((error) => {
        throw new Error(error);
    });
};
exports.default = PaymentService;
