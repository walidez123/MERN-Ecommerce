import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Make sure to use `req.userId`
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};