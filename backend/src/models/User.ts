import mongoose, { Schema, Document } from "mongoose";

interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  salt: string;
  verified: boolean;
  otp: number;
  role: string;
  otp_expiry: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, default: "user" },
    verified: { type: Boolean },
    otp: { type: Number },
    otp_expiry: { type: Date },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<UserDoc>("user", UserSchema);

export default User;
