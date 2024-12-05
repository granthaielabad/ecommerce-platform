import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 

// @desc Login User
// @router POST /api/auth/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }

  // Compare password with hashed password in DB
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    status: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username, // Include any other relevant user info here
    },
  });
});
