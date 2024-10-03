import e from "express";
import { signup,verifyEmail,logout,login, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = e.Router();

router.get('/check-auth',protectedRoute,checkAuth)
router.post('/signup' , signup)
router.post('/login' , login)
router.post('/verify-email' , verifyEmail)
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password' , resetPassword)
router.post('/logout' , logout)


export default router