"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfile = exports.UserLogin = exports.UserSignUp = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var dto_1 = require("../dto");
var utility_1 = require("../utility");
var User_1 = __importDefault(require("../models/User"));
var asyncErrorHandler_1 = require("../utility/asyncErrorHandler");
/**
    @desc   Register a new user
    @route  POST  /api/users/signup
    @access Public
*/
exports.UserSignUp = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInputs, validationError, username, email, password, salt, userPassword, _a, otp, expiry, existingUser, result, signature;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateUserInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(userInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                validationError = _b.sent();
                if (validationError.length > 0) {
                    return [2 /*return*/, res.status(400).json(validationError)];
                }
                username = userInputs.username, email = userInputs.email, password = userInputs.password;
                return [4 /*yield*/, (0, utility_1.GenerateSalt)()];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, (0, utility_1.GeneratePassword)(password, salt)];
            case 3:
                userPassword = _b.sent();
                _a = (0, utility_1.GenerateOtp)(), otp = _a.otp, expiry = _a.expiry;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 4:
                existingUser = _b.sent();
                if (existingUser !== null) {
                    return [2 /*return*/, res.status(400).json({ message: "Email already exist!" })];
                }
                return [4 /*yield*/, User_1.default.create({
                        username: username,
                        email: email,
                        password: userPassword,
                        salt: salt,
                        otp: otp,
                        otp_expiry: expiry,
                        verified: false,
                    })];
            case 5:
                result = _b.sent();
                if (!result) return [3 /*break*/, 7];
                // send OTP to customer
                console.log(otp);
                return [4 /*yield*/, (0, utility_1.GenerateSignature)({
                        _id: result._id,
                        email: result.email,
                        verified: result.verified,
                        role: result.role,
                    })];
            case 6:
                signature = _b.sent();
                (0, utility_1.setCookie)(res, "token", signature);
                // Send the result
                return [2 /*return*/, res.status(201).json({
                        signature: signature,
                        verified: result.verified,
                        email: result.email,
                        role: result.role,
                    })];
            case 7: return [2 /*return*/, res.status(400).json({ msg: "Error while creating user" })];
        }
    });
}); });
/**
    @desc   Login user
    @route  POST  /api/users/login
    @access Public
*/
exports.UserLogin = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInputs, validationError, email, password, user, validation, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInputs = (0, class_transformer_1.plainToClass)(dto_1.UserLoginInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(userInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                validationError = _a.sent();
                if (validationError.length > 0) {
                    return [2 /*return*/, res.status(400).json(validationError)];
                }
                email = userInputs.email, password = userInputs.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, utility_1.ValidatePassword)(password, user.password, user.salt)];
            case 3:
                validation = _a.sent();
                if (!validation) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, utility_1.GenerateSignature)({
                        _id: user._id,
                        email: user.email,
                        verified: user.verified,
                        role: user.role,
                    })];
            case 4:
                signature = _a.sent();
                (0, utility_1.setCookie)(res, "token", signature);
                return [2 /*return*/, res.status(200).json({
                        signature: signature,
                        email: user.email,
                        verified: user.verified,
                        role: user.role,
                    })];
            case 5: return [2 /*return*/, res.status(400).json({ message: "Invalid Username and Password" })];
        }
    });
}); });
/**
    @desc   Get user profile
    @route  POST  /api/users/profile
    @access Private
*/
exports.GetUserProfile = (0, asyncErrorHandler_1.asyncErrorHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.findById(user._id)];
            case 1:
                profile = _a.sent();
                if (profile) {
                    return [2 /*return*/, res.status(200).json(profile)];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ msg: "Error while Fetching Profile" })];
        }
    });
}); });
//# sourceMappingURL=authController.js.map