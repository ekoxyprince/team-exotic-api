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
const config_1 = __importDefault(require("../../config"));
const order_model_1 = __importDefault(require("../../database/models/order.model"));
const payment_model_1 = __importDefault(require("../../database/models/payment.model"));
const client_model_1 = __importDefault(require("../../database/models/client.model"));
const car_model_1 = __importDefault(require("../../database/models/car.model"));
const brand_model_1 = __importDefault(require("../../database/models/brand.model"));
class UserService {
    constructor(user) {
        this.user = user;
        this.getDashboardDetails = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const details = this.user;
            const newOrders = yield order_model_1.default.countDocuments({ orderStatus: "booked" });
            const allOrders = yield order_model_1.default.countDocuments();
            const payments = yield payment_model_1.default.countDocuments();
            const newUsers = yield client_model_1.default.countDocuments({ status: "unverified" });
            const allUsers = yield client_model_1.default.countDocuments();
            const availableCars = yield car_model_1.default.countDocuments({ status: 'active', category: 'exotic' });
            const completedRentals = yield order_model_1.default.countDocuments({ orderStatus: 'completed' });
            const allCars = yield car_model_1.default.countDocuments();
            const brands = yield brand_model_1.default.countDocuments();
            const estValues = yield payment_model_1.default.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, amount: { $sum: "$amount" } } }]);
            return {
                admin_details: details,
                new_orders: newOrders,
                total_orders: allOrders,
                total_payments: payments,
                new_users: newUsers,
                total_users: allUsers,
                total_cars: allCars,
                total_brands: brands,
                est_revenue: ((_a = estValues[0]) === null || _a === void 0 ? void 0 : _a.amount) || 0,
                available_cars: availableCars,
                completed_rentals: completedRentals
            };
        });
        this.user = user;
    }
    getDetails() {
        return this.user;
    }
    updateDetails(body, files) {
        const arrBody = Object.keys(body);
        for (let i = 0; i < arrBody.length; i++) {
            const key = arrBody[i];
            if (key in this.user) {
                this.user[key] = Object.values(body)[i];
            }
        }
        this.user['profileImage'] = config_1.default.server_url + `${files[0].destination}${files[0].filename}`.slice(config_1.default.split_val);
        this.user['coverImage'] = config_1.default.server_url + `${files[1].destination}${files[1].filename}`.slice(config_1.default.split_val);
        this.user.save();
    }
}
exports.default = UserService;
