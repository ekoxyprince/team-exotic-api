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
exports.Status = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Category;
(function (Category) {
    Category["EXOTIC"] = "exotic";
    Category["RETIRED"] = "retired";
    Category["CASUAL"] = "casual";
})(Category || (Category = {}));
var Service;
(function (Service) {
    Service["CORPORATE"] = "corporate";
    Service["EVENT"] = "event";
    Service["SELF"] = "self";
    Service["MUSIC"] = "music";
    Service["PHOTO"] = "photoshoot";
    Service["ALL"] = "all";
})(Service || (Service = {}));
var DurationUnit;
(function (DurationUnit) {
    DurationUnit["DAY"] = "day";
    DurationUnit["HOUR"] = "hr";
    DurationUnit["WEEK"] = "wk";
})(DurationUnit || (DurationUnit = {}));
var Transmission;
(function (Transmission) {
    Transmission["AUTO"] = "automatic";
    Transmission["MANUAL"] = "manual";
})(Transmission || (Transmission = {}));
var Fuel;
(function (Fuel) {
    Fuel["GASOLINE"] = "gasoline";
    Fuel["DEISEL"] = "deisel";
    Fuel["KEROSENE"] = "kerosene";
    Fuel["BATTERY"] = "battery";
})(Fuel || (Fuel = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "active";
    Status["BOOKED"] = "booked";
    Status["RETIRED"] = "retired";
})(Status || (exports.Status = Status = {}));
const CarSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Car name cannot be left undefined"],
    },
    category: {
        type: String,
        enum: [Category.EXOTIC, Category.CASUAL, Category.RETIRED],
        required: [true, "Car category cannot be left undefined"],
    },
    person: {
        type: Number,
        required: [true, "Number of car seaters cannot be left undefined"],
    },
    price: {
        type: Number,
        required: [true, "Price cannot be left undefined"],
    },
    service: {
        type: String,
        enum: [
            Service.ALL,
            Service.CORPORATE,
            Service.EVENT,
            Service.MUSIC,
            Service.PHOTO,
            Service.SELF,
        ],
        required: [true, "Service type required"],
    },
    duration: {
        type: Number,
        required: [true, "Duration cannot be left undefined"],
    },
    durationUnit: {
        type: String,
        enum: [DurationUnit.DAY, DurationUnit.HOUR, DurationUnit.WEEK],
        required: [true, "Duration unit cannot be left undefined"],
    },
    transmision: {
        type: String,
        enum: [Transmission.AUTO, Transmission.MANUAL],
        required: [true, "Transmission field cannot be undefined"],
    },
    fuel: {
        type: String,
        enum: [Fuel.BATTERY, Fuel.DEISEL, Fuel.GASOLINE, Fuel.KEROSENE],
        required: [true, "Fuel type is required"],
    },
    status: {
        type: String,
        enum: [Status.ACTIVE, Status.BOOKED, Status.RETIRED],
        default: Status.ACTIVE,
        required: [true, "Status of car is required"],
    },
    tripMile: {
        type: Number,
        required: [true, "Trip Mile field is required"],
    },
    images: [
        {
            url: {
                type: String,
                required: [true, "images are required"],
            },
        },
    ],
    description: {
        type: String,
        required: [true, "Product description required"],
    },
    availableFrom: {
        type: Date,
        required: true,
    },
    availableTo: {
        type: Date,
        required: true,
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
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
});
const Car = mongoose_1.default.model("Car", CarSchema);
exports.default = Car;
