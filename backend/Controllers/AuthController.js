const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    // Pre-save hook in UserModel handles hashing
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: false,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user: user.username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });
    // Remove next() here to stop the lag
    return res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
