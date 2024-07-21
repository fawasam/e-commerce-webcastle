import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { authRoute, productRoute } from "../routes";
import { errorController } from "../controllers/errorController";
import { CustomError } from "../utility/CustomeError";

export default async (app: Application) => {
  app.use(
    helmet({
      strictTransportSecurity: {
        maxAge: 123456,
      },
      xFrameOptions: { action: "deny" },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.get("/", (req, res) => {
    res.json("Hello, This is Webcatle Ecommerce backend!!");
  });

  app.use("/images", express.static(path.join(__dirname, "../images")));
  app.use("/api/user", authRoute);
  app.use("/api/product", productRoute);

  app.all("*", (req, res, next) => {
    const err = new CustomError(
      `Cannot find ${req.originalUrl} on the server`,
      404
    );
    next(err);
  });
  app.use(errorController);

  return app;
};
