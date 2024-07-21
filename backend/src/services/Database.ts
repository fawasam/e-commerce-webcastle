import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async function dbConnection() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
}
