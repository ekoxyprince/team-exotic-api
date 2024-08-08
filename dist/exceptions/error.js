"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotfoundError = exports.ValidationError = exports.AuthorizationError = exports.AuthenticationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
class AuthenticationError extends CustomError {
    constructor(message, details) {
        super(message, details);
        this.code = 401;
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends CustomError {
    constructor(message, details) {
        super(message, details);
        this.code = 403;
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}
exports.AuthorizationError = AuthorizationError;
class ValidationError extends CustomError {
    constructor(message, details) {
        super(message, details);
        this.code = 422;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class NotfoundError extends CustomError {
    constructor(message, details) {
        super(message, details);
        this.code = 404;
        Object.setPrototypeOf(this, NotfoundError.prototype);
    }
}
exports.NotfoundError = NotfoundError;
class BadRequestError extends CustomError {
    constructor(message, details) {
        super(message, details);
        this.code = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
