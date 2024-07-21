import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserInput, UserLoginInput } from "../dto";
import {
  GenerateOtp,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  setCookie,
  ValidatePassword,
} from "../utility";
import User from "../models/User";
import { asyncErrorHandler } from "../utility/asyncErrorHandler";

/**
    @desc   Register a new user
    @route  POST  /api/users/signup
    @access Public
*/

export const UserSignUp = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userInputs = plainToClass(CreateUserInput, req.body);

    const validationError = await validate(userInputs, {
      validationError: { target: true },
    });

    if (validationError.length > 0) {
      return res.status(400).json(validationError);
    }

    const { username, email, password } = userInputs;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const { otp, expiry } = GenerateOtp();

    const existingUser = await User.findOne({ email: email });

    if (existingUser !== null) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    const result = await User.create({
      username: username,
      email: email,
      password: userPassword,
      salt: salt,
      otp: otp,
      otp_expiry: expiry,
      verified: false,
    });

    if (result) {
      // send OTP to customer
      console.log(otp);

      // await onRequestOTP(otp, phone);

      //Generate the Signature
      const signature = await GenerateSignature({
        _id: result._id,
        email: result.email,
        verified: result.verified,
        role: result.role,
      });
      setCookie(res, "token", signature);

      // Send the result
      return res.status(201).json({
        signature,
        verified: result.verified,
        email: result.email,
        role: result.role,
      });
    }

    return res.status(400).json({ msg: "Error while creating user" });
  }
);

/**
    @desc   Login user
    @route  POST  /api/users/login
    @access Public
*/

export const UserLogin = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userInputs = plainToClass(UserLoginInput, req.body);

    const validationError = await validate(userInputs, {
      validationError: { target: true },
    });

    if (validationError.length > 0) {
      return res.status(400).json(validationError);
    }

    const { email, password } = userInputs;
    const user = await User.findOne({ email: email });
    if (user) {
      const validation = await ValidatePassword(
        password,
        user.password,
        user.salt
      );

      if (validation) {
        const signature = await GenerateSignature({
          _id: user._id,
          email: user.email,
          verified: user.verified,
          role: user.role,
        });
        setCookie(res, "token", signature);

        return res.status(200).json({
          signature,
          email: user.email,
          verified: user.verified,
          role: user.role,
        });
      }
    }

    return res.status(400).json({ message: "Invalid Username and Password" });
  }
);

/**
    @desc   Get user profile
    @route  POST  /api/users/profile
    @access Private
*/

export const GetUserProfile = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
      const profile = await User.findById(user._id);

      if (profile) {
        return res.status(200).json(profile);
      }
    }
    return res.status(400).json({ msg: "Error while Fetching Profile" });
  }
);
