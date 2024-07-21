"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = void 0;
var CustomeError_1 = require("../utility/CustomeError");
var castErrorHandler = function (err) {
    var msg = "Invalid value for ".concat(err.value, ": ").concat(err.path);
    return new CustomeError_1.CustomError(msg, 400);
};
var duplicateKeyErrorHandler = function (err) {
    var key, msg;
    if (err.keyValue) {
        if (err.keyValue.email) {
            key = "email";
        }
        else if (err.keyValue.username) {
            key = "username";
        }
    }
    switch (key) {
        case "email":
            msg = "Email already registered, Please login to your account";
            break;
        case "username":
            msg = "Username already exists";
            break;
        case "name":
            msg = "Product with this name already exists";
            break;
        default:
            msg = " Already Exist ";
    }
    return new CustomeError_1.CustomError(msg, 400);
};
var validationErrorHandler = function (err) {
    var errors = Object.values(err.errors).map(function (value) { return value.message; });
    var errorMessages = errors.join(". ");
    var msg = "Invalid input data: ".concat(errorMessages);
    return new CustomeError_1.CustomError(msg, 400);
};
var tokenExpireErrorHandler = function (err) {
    var msg = "JWT has expired. Please login again!";
    return new CustomeError_1.CustomError(msg, 401);
};
var jwtErrorHandler = function (err) {
    var msg = "Invalid token. Please login again!";
    return new CustomeError_1.CustomError(msg, 401);
};
var MulterErrorHandler = function (err) {
    var msg = "Please provide a valid image file";
    return new CustomeError_1.CustomError(msg, 401);
};
var errorController = function (error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        (0, CustomeError_1.devErrors)(res, error);
    }
    else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError")
            error = castErrorHandler(error);
        if (error.name === "MulterError")
            error = MulterErrorHandler(error);
        if (error.code === 11000)
            error = duplicateKeyErrorHandler(error);
        if (error.name === "ValidationError")
            error = validationErrorHandler(error);
        if (error.name === "TokenExpireError")
            error = tokenExpireErrorHandler(error);
        if (error.name === "JsonWebTokenError")
            error = jwtErrorHandler(error);
        (0, CustomeError_1.prodErrors)(res, error);
    }
};
exports.errorController = errorController;
//# sourceMappingURL=errorController.js.map