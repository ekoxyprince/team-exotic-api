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
const nodemailer_1 = require("nodemailer");
const config_1 = __importDefault(require("../config"));
const template_1 = __importDefault(require("./template"));
function mail(html, subject, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = (0, nodemailer_1.createTransport)({
            auth: {
                user: config_1.default.email,
                pass: config_1.default.email_pass,
            },
            port: 465,
            secure: true,
            host: config_1.default.email_host,
            tls: {
                rejectUnauthorized: true,
            },
        });
        const mailer = yield transporter.sendMail({
            from: `"Team Exotic rentals" <${config_1.default.email}>`,
            to: email || config_1.default.email,
            subject: subject,
            text: "Hello",
            html,
        });
        return mailer;
    });
}
class Mailer {
    constructor() {
        this.registration = (name, email) => {
            const msg = template_1.default.message(name, "You have successfully registered on team exotic rentals Kindly wait while we verify your documents", "Account Registration");
            return mail(msg, "Account Registration", email);
        };
        this.adminVerification = () => {
            const msg = template_1.default.message("Admin", `A new user has registered kindly verify the provided documents`, "User Registration");
            return mail(msg, "Account Registation");
        };
        this.userVerification = (name, email) => {
            const msg = template_1.default.message(name, "Provided details have been verified and you can now proceed with your order", "Account Verification");
            return mail(msg, "Account Verification", email);
        };
        this.orderPlacement = (name, email, car) => {
            const msg = template_1.default.message(name, `You made a request to book one of our rides: ${car}. we await your payment.`, "Ride Booked");
            return mail(msg, "Ride Booked", email);
        };
        this.adminOrderVerification = (car) => {
            const msg = template_1.default.message("Admin", `A user just booked ${car} kindly go online to validate this order`, "Order Booked");
            return mail(msg, "Ride Booked");
        };
        this.userPayment = (car, name, email, status) => {
            const msg = template_1.default.message(name, `Your payment status for ${car} is ${status}.`, "Payment notification");
            return mail(msg, "Payment notification", email);
        };
        this.adminUserPayment = (car, status) => {
            const msg = template_1.default.message("Admin", `The payment status for ${car} is ${status}`, `Payment notification`);
            return mail(msg, `Payment notification`);
        };
    }
}
exports.default = new Mailer();
