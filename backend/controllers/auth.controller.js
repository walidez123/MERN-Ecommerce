import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { sendResetPasswordEmail, sendVerificationEmail,sendWelcomeEmail } from "../mailtrap/emails.js";
export const checkAuth = async (req, res) => {
  try {
    // Find user by ID excluding the password field
    const user = await User.findById(req.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Send only the user data you need
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Signup function
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = Math.floor(10000 + Math.random() * 9000000).toString();

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
    });

    await newUser.save();

    // Generate JWT and set cookies
    generateTokenAndSetCookies(res, newUser._id);

    // Send verification email, but don't throw error if it fails
    try {
      await sendVerificationEmail(newUser.email, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    // Respond with success, regardless of email error
    res.json({ msg: "User registered successfully", newUser });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const {token} = req.body
  const user = await User.findOne({ verificationToken: token, verificationTokenExpires: {$gt: Date.now()}});
  if(!user){
    return res.status(400).json({msg: "Invalid or expired verification token"})
  }
  user.isVerified = true;
  user.verificationTokenExpires = null;
  user.verificationToken = null;
  await user.save();
  // await sendWelcomeEmail(user.email,user.name)

  res.json({msg: "Email verified successfully"})

}
export const login = async (req,res) => {
  const {email , password} = req.body
  if(!email || !password){
    return res.status(400).json({msg: "Please fill all fields"})
  }
  const user = await User.findOne({email})
  const correctPassword =await bcrypt.compare(password,user.password)
  if(correctPassword){
    generateTokenAndSetCookies(res, user._id);
    return res.json({msg: "Logged in successfully" ,user})
  }
  return res.status(400).json({msg: "Invalid credentials" })
}

export const logout = async (req,res) => {
  res.clearCookie("token");
  res.json({msg: "Logged out successfully"})
}

export const forgotPassword = async (req,res) => {
  const {email} = req.body
  if(!email){
    return res.status(400).json({msg: "Please provide an email"})
  }
  const user = await User.findOne({email})
  if(!user){
    return res.status(400).json({msg: "User not found"})
  }
  const resetToken = Math.floor(
    10000 + Math.random() * 9000000
  ).toString();
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now()+10*60*1000;
  await user.save();
  await sendResetPasswordEmail(user.email, resetToken)
  res.json({msg: "Reset password link sent successfully"})
}

export const resetPassword = async (req,res) => {
  const {resetToken, newPassword} = req.body
  if(!resetToken ||!newPassword){
    return res.status(400).json({msg: "Please provide all fields"})
  }
  const user = await User.findOne({resetToken, resetTokenExpires: {$gt: Date.now()}});
  if(!user){
    return res.status(400).json({msg: "Invalid or expired reset token"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpires = null;
  await user.save();
  res.json({msg: "Password reset successfully"})
}