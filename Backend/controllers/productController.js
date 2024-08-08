import fs from "fs";
import Products from "../models/productsModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProduct = async (req, res) => {
  try {
    const { name, desc, price, category, quantity, shipping } = req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(404).send({ message: "Name is required" });
      case !desc:
        return res.status(404).send({ message: "Description is required" });
      case !price:
        return res.status(404).send({ message: "Price is required" });
      case !category:
        return res.status(404).send({ message: "Category is required" });
      case !quantity:
        return res.status(404).send({ message: "Quantity is required" });
      case image && image.size > 1000000:
        return res.status(404).send({
          message: "image is required and it should be less than 1mb",
        });
    }

    const newProduct = new Products({ ...req.fields, slug: slugify(name) });
    if (image) {
      newProduct.image.data = fs.readFileSync(image.path);
      newProduct.image.contentType = image.type;
    }
    await newProduct.save();
    return res.status(201).send({
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, price, category, quantity, shipping } = req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(404).send({ message: "Name is required" });
      case !desc:
        return res.status(404).send({ message: "Description is required" });
      case !price:
        return res.status(404).send({ message: "Price is required" });
      case !category:
        return res.status(404).send({ message: "Category is required" });
      case !quantity:
        return res.status(404).send({ message: "Quantity is required" });
      case image && image.size > 1000000:
        return res.status(404).send({
          message: "image is required and it should be less than 1mb",
        });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      updatedProduct.image.data = fs.readFileSync(image.path);
      updatedProduct.image.contentType = image.type;
    }
    await updatedProduct.save();
    return res.status(201).send({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({}).select("-image");

    return res.status(200).send({
      totalProducts: allProducts.length,
      message: "All products",
      allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await Products.findById(id)
      .select("name price desc category quantity shipping")
      .populate("category");
    return res.status(201).send({
      message: "Single Product",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Products.findById(id).select("image");
    if (image.image.data) {
      res.set("Content-type", image.image.contentType);
      return res.status(200).send(image.image.data);
    }
  } catch (error) {
    console.log({ error });
    res.send(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Products.findByIdAndDelete(id);
    return res.status(200).send({ message: "Successfully deleted product" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Apply category filter if present
    if (checked.length > 0) {
      args.category = { $in: checked };
    }

    // Apply price filter if present
    if (radio.length === 2) {
      args.price = { $gte: Number(radio[0]), $lte: Number(radio[1]) };
    }

    console.log("Filter Arguments:", args); // Debugging statement

    const products = await Products.find(args).select("_id name desc price");
    res.send({
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getTotal = async (req, res) => {
  try {
    const total = await Products.find().estimatedDocumentCount();
    res.send({ total });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductsList = async (req, res) => {
  try {
    const perPage = 8;
    const pageNo = req.params.page ? req.params.page : 1;

    const products = await Products.find({})
      .select("_id name desc price category")
      .populate("category")
      .skip((pageNo - 1) * perPage)
      .limit(perPage);
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.end(error);
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Products.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    }).select("name _id desc price");

    return res.json(results);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { cid } = req.params;

    const relatedProducts = await Products.find({
      category: cid,
    })
      .select("name desc price _id")
      .limit(4);

    res.status(200).send({ relatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    if (cid) {
      const category = await Category.findById(cid).select("name");
      const products = await Products.find({ category: cid });
      res.status(200).send({ products, category });
    } else {
      res.status(500).send({ message: "Category Id is required" });
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export const generateBraintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const braintreePayment = async (req, res) => {
  try {
    const { cartData, nonce } = req.body;
    let total = 0;
    cartData.map((i) => (total += i.price));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
