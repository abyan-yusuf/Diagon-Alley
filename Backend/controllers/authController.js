import User from "../models/authModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      securityQuestion,
      securityAnswer,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !securityQuestion ||
      !securityAnswer
    ) {
      return res.status(406).send({
        message:
          "Please enter a name, email, password, phone, address, security question, security answer",
      });
    }

    const userByEmail = await User.findOne({ email });
    const userByPhone = await User.findOne({ phone });
    if (userByEmail || userByPhone || (userByEmail && userByPhone)) {
      return res
        .status(400)
        .send({ message: "User already exists with this email or phone" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      securityQuestion,
      securityAnswer,
    });
    newUser.save();
    const user = await User.findOne({ email });
    res.status(201).send({ message: "successfully created" });
  } catch (error) {
    res.send(404).send({ error: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please enter your email address and password" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send({ message: "User does not exists" });
    }
    const actualPassword = await comparePassword(password, user.password);
    if (!actualPassword) {
      return res.status(400).send({ message: "Incorrect Password" });
    }
    const token = JWT.sign({ _id: user._id }, process.env.secret_key, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ message: "Logged in successfully", allInfo: user, token });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleteUser = await User.findByIdAndDelete(id)
    res.status(200).send({message:"Successfully deleted user"})
  } catch (error) {
    res.status(404).send({error})
  }
};

export const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({ message: "All users", allUsers });
  } catch (error) {
    console.error(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!securityAnswer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    const user = await User.findOne({ email, securityAnswer });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong Email or Answer" });
    }
    const hashedPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

export const getSecurityQuestion = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(404).send({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "No user found with this email" });
    }
    console.log(user);
    res.status(200).send(user?.securityQuestion);
  } catch (error) {
    console.log(error);
  }
};
