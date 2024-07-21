import { CreateProductInput } from "../dto";
import Product from "../models/Product";
import { Request, Response } from "express";
import User from "../models/User";
import { asyncErrorHandler } from "../utility/asyncErrorHandler";
import fs from "fs";
import path from "path";
/**
    @desc   Get all products
    @route  GET  /api/product
    @access Public
*/

export const GetProducts = asyncErrorHandler(
  async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

/**
    @desc   Get single product
    @route  GET  /api/product/:id
    @access Public
*/

export const GetProductById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
  }
);

/**
    @desc   Create new product
    @route  POST  /api/product
    @access Private
*/

export const CreateProduct = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { name, description, category, price, subtitle, size } = <
      CreateProductInput
    >req.body;

    if (!name || !description || !category || !price || !subtitle || !size) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      const seller = await User.findById(user._id);
      if (seller !== null) {
        const files = req.files as [Express.Multer.File];

        const images = files.map((file: Express.Multer.File) => file.filename);
        if (!images) {
          return res.status(400).json({ message: "Images not found" });
        }
        const product = new Product({
          name,
          description,
          category,
          price,
          subtitle,
          seller: seller._id,
          images,
          size,
        });
        await product.save();
        return res.status(200).json(product);
      }
    } else {
      return res.status(400).json({ message: "Not Authorized" });
    }
    return res.status(400).json({ message: "Unable to create product" });
  }
);

/**
    @desc   Update a product
    @route  PUT  /api/product
    @access Private
*/
export const UpdateProduct = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
      const seller = await User.findById(user._id);
      if (!seller) {
        return res.status(400).json({ message: "User not found" });
      } else {
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(product);
      }
    } else {
      return res.status(400).json({ message: "Unable to Update product " });
    }
  }
);

/**
    @desc   Delete a product
    @route  DELETE  /api/product/:id
    @access Private
*/
export const DeleteProduct = asyncErrorHandler(
  async (req: Request, res: Response) => {
    // const product = await Product.findByIdAndDelete(req.params.id);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    const imagePaths = product.images;
    imagePaths.forEach((imagePath: string) => {
      fs.unlink(path.resolve(__dirname, "..", "images", imagePath), (err) => {
        if (err) {
          // Log error or handle it as per your application's needs
          console.error(`Failed to delete image at ${imagePath}: ${err}`);
        }
      });
    });
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted Successfully" });
  }
);
