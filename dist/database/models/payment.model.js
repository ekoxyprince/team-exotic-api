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
const mongoose_1 = __importStar(require("mongoose"));
var Status;
(function (Status) {
    Status["UNPAID"] = "unpaid";
    Status["PAID"] = "paid";
})(Status || (Status = {}));
const PaymentSchema = new mongoose_1.Schema({
    clientName: {
        type: String,
        required: [true, "Client name is required"]
    },
    order: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "Order id required"],
        ref: "Order"
    },
    session_id: {
        type: String,
        required: [true, "Session Id is required"]
    },
    status: {
        type: String,
        enum: [Status.PAID, Status.UNPAID],
        required: [true, "Status required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
const Payment = mongoose_1.default.model("Payment", PaymentSchema);
exports.default = Payment;
