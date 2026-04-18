import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ========== SIGNUP ==========
const signup = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (
      !name ||
      !email ||
      !role ||
      !password ||
      name.trim() === "" ||
      email.trim() === "" ||
      role.trim() === "" ||
      password.trim() === ""
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Fields Empty" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      role,
      password: hashpass,
    });

    res
      .status(201)
      .json({ success: true, user, message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== LOGIN ==========
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      !password ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Fields Empty" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect Email" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect Password" });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWTTOKEN,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      user,
      message: "Login successfully",
      jwtToken,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== UPDATE PASSWORD ==========
const updateSignup = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new passwords are required",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const { password, ...safeUser } = user._doc;
    res.json({
      success: true,
      message: "Password updated successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error("Password Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ========== FETCH ALL USERS ==========
const fetchSignups = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // ✅ Fix: was sending undefined "contact"
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== DELETE USER ==========
const deleteSignups = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete admin" });
  }
};

export { signup, login, updateSignup, fetchSignups, deleteSignups };
