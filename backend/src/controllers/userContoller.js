import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for loginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for RegisterUser

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.json({ success: false, message: "user already exists" });
    }

    //validating email and password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create a newUser

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, message: "user register", token });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// Route for adminLogin

const adminLogin = async (req, res) => {
  res.json({ message: "admin api is wroking" });
};

export { loginUser, registerUser, adminLogin };
