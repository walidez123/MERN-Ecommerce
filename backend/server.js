import e,{json} from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config()
const app = e()

app.use(e.json())
app.use(cookieParser())
app.use(cors({ 
    origin: process.env.CLIENT_URL,  // Add your front-end domain here
    credentials: true,  // Allow sending cookies with CORS
  }));
 // Routes
app.use("/api/auth",authRoutes)

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
})