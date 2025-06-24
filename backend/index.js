import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'  
import sessionRoutes from './routes/sessionRoutes.js'  
import questionRoutes from './routes/questionRoutes.js'  
import { protect } from './middlewares/authMiddleware.js';
import { generateInterviewQuestions } from './controllers/aiController.js';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        withCredentials: true,
        allowedHeaders: ["Content-Type","Authorization"]
    })
)

app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/sessions',sessionRoutes)
app.use('/api/questions',questionRoutes)
app.use('/api/ai/generate-questions',protect,generateInterviewQuestions)

app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running on PORT ${PORT}`)
})
