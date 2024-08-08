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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.PaymentStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PENDING"] = "pending";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["BOOKED"] = "booked";
    OrderStatus["LIVE"] = "live";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELED"] = "canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
const OrderSchema = new mongoose_1.Schema({
    pickupDate: {
        type: String,
        required: [true, "Pickup Date is not Provided"],
    },
    pickupTime: {
        type: String,
        required: [true, "Pickup Time is required"],
    },
    pickupLocation: {
        type: String,
        required: [true, "Pickup Location is required"],
    },
    returnDate: {
        type: String,
        required: [true, "Return Date is required"],
    },
    returnTime: {
        type: String,
        required: [true, "Return Time is required"],
    },
    returnLocation: {
        type: String,
        required: [true, "Return Location is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    totalAmount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    client: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "Client Id required"],
        ref: "Client",
    },
    car: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "Car Id is required"],
        ref: "Car",
    },
    orderStatus: {
        type: String,
        enum: [
            OrderStatus.BOOKED,
            OrderStatus.CANCELED,
            OrderStatus.COMPLETED,
            OrderStatus.LIVE,
        ],
        required: [true, "Order Status is required"],
        default: OrderStatus.LIVE
    },
    paymentStatus: {
        type: String,
        required: [true, "Payment Status is required"],
        enum: [
            PaymentStatus.COMPLETED,
            PaymentStatus.FAILED,
            PaymentStatus.PENDING,
            PaymentStatus.REFUNDED,
        ],
        default: PaymentStatus.PENDING
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    }
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
