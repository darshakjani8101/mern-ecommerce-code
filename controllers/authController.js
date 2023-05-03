import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

//Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "Name is required." });
    }
    if (!email) {
      return res.send({ message: "Email is required." });
    }
    if (!password) {
      return res.send({ message: "Password is required." });
    }
    if (!phone) {
      return res.send({ message: "Pnone number is required." });
    }
    if (!address) {
      return res.send({ message: "Address is required." });
    }
    if (!answer) {
      return res.send({ message: "Answer is required." });
    }

    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User is already registered. Please login.",
      });
    }

    //register new user
    const hashedPassword = await hashPassword(password);

    //save new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User is registered successfully. Please login to continue.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration.",
      error,
    });
  }
};

//Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password.",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password.",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User is logged in successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login.",
      error,
    });
  }
};

//Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    //validations
    if (!email) {
      res.status(400).send({ message: "Email is required." });
    }
    if (!answer) {
      res.status(400).send({ message: "Security answer is required." });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required." });
    }

    //check user
    const user = await userModel.findOne({ email, answer });

    //user validation
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or security answer.",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password resetted successfully. Please login to continue.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while resetting your password.",
      error,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  console.log("Protected Route");
  res.send("Protected Route");
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res.status(200).send({
        success: false,
        message: "Password should be atleast 6 characters long.",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating your profile.",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Successfully found your orders.",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting your orders.",
      error,
    });
  }
};

//all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Successfully found all orders.",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders.",
      error,
    });
  }
};

//order status update
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Successfully updated order status.",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status.",
      error,
    });
  }
};

//delete order
export const deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    await orderModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Successfully deleted the order.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the order.",
      error,
    });
  }
};

//all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Successfully found all users.",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all users.",
      error,
    });
  }
};

//user role update
export const userRoleController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const users = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Successfully updated user role.",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating user role.",
      error,
    });
  }
};

//delete user
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Successfully deleted the user.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the user.",
      error,
    });
  }
};
