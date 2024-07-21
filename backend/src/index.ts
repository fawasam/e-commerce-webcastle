import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";
import { PORT } from "./config";

const StartServer = async () => {
  const app = express();
  await dbConnection();
  await App(app);
  const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
  process.on("unhandledRejection", (err: any) => {
    console.log(err.name, "+" + err.message);
    console.log("Unhandled rejection occurred! Shutting down server ...");
    server.close(() => {
      process.exit(1);
    });
  });
};

StartServer();
