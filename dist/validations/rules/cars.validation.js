"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImages = exports.checkDescription = exports.checkTripMile = exports.checkFuel = exports.checkTransmission = exports.checkDurationUnit = exports.checkDuration = exports.checkService = exports.checkPrice = exports.checkPerson = exports.checkCategory = exports.checkName = void 0;
const express_validator_1 = require("express-validator");
exports.checkName = (0, express_validator_1.body)("name")
    .notEmpty()
    .withMessage("Car name is required");
exports.checkCategory = (0, express_validator_1.body)("category")
    .notEmpty()
    .withMessage("Category is required");
exports.checkPerson = (0, express_validator_1.body)("person")
    .notEmpty()
    .withMessage("Person is required")
    .isNumeric()
    .withMessage("Must be numbers");
exports.checkPrice = (0, express_validator_1.body)("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Must be numbers");
exports.checkService = (0, express_validator_1.body)("service")
    .notEmpty()
    .withMessage("Service is required");
exports.checkDuration = (0, express_validator_1.body)("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isNumeric()
    .withMessage("Must be numbers");
exports.checkDurationUnit = (0, express_validator_1.body)("durationUnit")
    .notEmpty()
    .withMessage("Duration Unit is required");
exports.checkTransmission = (0, express_validator_1.body)("transmision")
    .notEmpty()
    .withMessage("Transmision is required");
exports.checkFuel = (0, express_validator_1.body)("fuel")
    .notEmpty()
    .withMessage("Fuel is required");
exports.checkTripMile = (0, express_validator_1.body)("tripMile")
    .notEmpty()
    .withMessage("Trip mile is required")
    .isNumeric()
    .withMessage("Must be number");
exports.checkDescription = (0, express_validator_1.body)("description")
    .notEmpty()
    .withMessage("Description is required");
exports.checkImages = (0, express_validator_1.body)("")
    .custom((value, { req }) => {
    if (req.files && req.files.length > 4) {
        return true;
    }
    throw new Error("At least 4 images required");
});
