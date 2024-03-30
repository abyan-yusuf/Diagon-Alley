import JWT from "jsonwebtoken";
import User from "../models/authModel.js";

export const requireSignin = async (req, res, next) => {
  try {
    const tokenAvailable = req.headers.authorization;
    if (tokenAvailable) {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.secret_key
      );
      req.user = decode._id;
      return next();
    } else {
      return res.status(400).send({ message: "Please sign in first" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user.admin) {
      return res.status(400).send({ message: "You are not admin" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};
