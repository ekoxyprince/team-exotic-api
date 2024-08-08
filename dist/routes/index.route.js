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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = __importStar(require("../controllers/index.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const upload_middleware_1 = __importDefault(require("../middlewares/upload.middleware"));
const validations_1 = require("../validations");
router.route("/car").get(controller.getCarsPaginated);
router
    .route("/cars")
    .get(controller.getCars)
    .post([auth_middleware_1.default], [upload_middleware_1.default.array("image")], (0, validations_1.carValidationRules)(), controller.createCar);
router
    .route("/car/:id")
    .patch([auth_middleware_1.default], controller.updateSingleCar)
    .get(controller.getSingleCar)
    .delete([auth_middleware_1.default], controller.deleteSingleCar);
router.route("/search_car").get(controller.findByFilter);
router
    .route("/brand")
    .get(controller.findAllBrands)
    .post([auth_middleware_1.default, upload_middleware_1.default.single("image")], controller.createBrand);
router
    .route("/brand/:id")
    .get(controller.findSingleBrand)
    .patch([auth_middleware_1.default, upload_middleware_1.default.single("image")], controller.updateBrand)
    .delete([auth_middleware_1.default], controller.deleteBrand);
router
    .route("/other_cars")
    .get(controller.findOtherCarsExcept);
router
    .route("/client")
    .get(controller.findAllClients)
    .post([upload_middleware_1.default.array("image")], controller.findOrCreateUser);
router
    .route("/create_client")
    .post([upload_middleware_1.default.array("image")], controller.createUserForOrder);
router
    .route("/client/:driverLicenseNumber")
    .get([auth_middleware_1.default], controller.findUser);
router
    .route("/checkout")
    .post([upload_middleware_1.default.array("image")], controller.testStripe);
router
    .route("/find_client/:id")
    .get([auth_middleware_1.default], controller.findById);
router
    .route("/payment/success")
    .get(controller.createUserPayment);
router
    .route("/payment/cancel")
    .get(controller.createUserPayment);
exports.default = router;
