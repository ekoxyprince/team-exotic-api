"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidationRules = exports.resetPasswordRules = exports.forgotPasswordRules = exports.signinValidationRules = void 0;
const user_validation_1 = require("./rules/user.validation");
const cars_validation_1 = require("./rules/cars.validation");
const express_validator_1 = require("express-validator");
const error_1 = require("../exceptions/error");
const result = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        throw new error_1.ValidationError(error.msg, {
            path: error.path,
            field: error.location,
            value: error.value,
        });
    }
    next();
};
const signinValidationRules = () => {
    return [user_validation_1.checkEmail, user_validation_1.checkPassword, result];
};
exports.signinValidationRules = signinValidationRules;
const forgotPasswordRules = () => {
    return [user_validation_1.checkEmail, result];
};
exports.forgotPasswordRules = forgotPasswordRules;
const resetPasswordRules = () => {
    return [user_validation_1.checkresetToken, user_validation_1.checkPassword, result];
};
exports.resetPasswordRules = resetPasswordRules;
const carValidationRules = () => {
    return [
        cars_validation_1.checkCategory,
        cars_validation_1.checkDurationUnit,
        cars_validation_1.checkDuration,
        cars_validation_1.checkFuel,
        cars_validation_1.checkName,
        cars_validation_1.checkPerson,
        cars_validation_1.checkPrice,
        cars_validation_1.checkService,
        cars_validation_1.checkTransmission,
        cars_validation_1.checkDescription,
        cars_validation_1.checkTripMile,
        cars_validation_1.checkImages,
        result,
    ];
};
exports.carValidationRules = carValidationRules;
