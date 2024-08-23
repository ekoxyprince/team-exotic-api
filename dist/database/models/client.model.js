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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const client_hook_1 = require("../hooks/client.hook");
var Status;
(function (Status) {
    Status["VERIFIED"] = "verified";
    Status["UNVERIFIED"] = "unverified";
    Status["RESTRICTED"] = "restricted";
})(Status || (Status = {}));
const ClientSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, "Client firstname is required"],
        unique: true
    },
    lastname: {
        type: String,
        required: [true, "Client lastname is required"],
        unique: true
    },
    middlename: {
        type: String,
        required: [true, "Client middlename is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Client Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Client Mobile number is required"],
    },
    city: {
        type: String,
        required: [true, "Client city is required"],
    },
    state: {
        type: String,
        required: [true, "Client state is required"],
    },
    zipcode: {
        type: String,
        required: [true, "Client zipcode is required"],
    },
    country: {
        type: String,
        required: [true, "Client country is required"],
    },
    insuranceCompany: {
        type: String,
        required: [true, "Client insurance company is required"],
    },
    insurancePolicyNumber: {
        type: String,
        required: [true, "Client policy company is required"],
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Client Birth date is required"],
    },
    driverLicenseNumber: {
        type: Number,
        required: [true, "Client License number is required"],
        unique: true
    },
    insuranceImage: {
        type: String,
        required: [true, "Insurance Image is required"],
    },
    licenseImage: {
        type: String,
        required: [true, "License Image is required"],
    },
    status: {
        type: String,
        required: [true, "status is required"],
        enum: [Status.RESTRICTED, Status.UNVERIFIED, Status.VERIFIED],
        default: Status.UNVERIFIED
    },
    createdAt: {
        type: Date,
        required: [true, "Created At missing"],
        default: new Date(Date.now()),
    },
    updatedAt: {
        type: Date,
        required: [true, "Updated At missing"],
        default: new Date(Date.now()),
    },
});
ClientSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client_hook_1.beforeSave.call(this, next);
    });
});
const Client = mongoose_1.default.model("Client", ClientSchema);
exports.default = Client;
