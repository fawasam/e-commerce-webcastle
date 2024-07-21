"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorHandler = void 0;
var asyncErrorHandler = function (func) {
    return function (req, res, next) {
        func(req, res, next).catch(function (err) { return next(err); });
    };
};
exports.asyncErrorHandler = asyncErrorHandler;
//# sourceMappingURL=asyncErrorHandler.js.map