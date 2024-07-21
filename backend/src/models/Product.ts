import mongoose, { Schema, Document } from "mongoose";

export interface ProductDoc extends Document {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  size: [string];
  images: [string];
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    price: { type: Number },
    rating: { type: Number },
    images: { type: [String] },
    size: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
      },
    },
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDoc>("product", ProductSchema);

export default Product;
