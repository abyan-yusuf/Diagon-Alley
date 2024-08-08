import mongoose from "mongoose"
import { model, Schema } from "mongoose";

const orderSchema = Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Products",
    },
  ],
  payment: {},
  buyer: {
    type: mongoose.ObjectId,
    ref: "Users",
  },
  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cencelled"],
  },
}, {timestamps: true});

export default model("Orders", orderSchema)