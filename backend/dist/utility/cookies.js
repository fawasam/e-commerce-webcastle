"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = setCookie;
/**
 * Sets a cookie on the response object.
 *
 * @param res - The Express response object.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional settings for the cookie.
 */
function setCookie(res, name, value, options) {
    if (options === void 0) { options = {}; }
    var defaultOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // Default to 24 hours
    };
    var finalOptions = __assign(__assign({}, defaultOptions), options);
    res.cookie(name, value, finalOptions);
}
//# sourceMappingURL=cookies.js.map