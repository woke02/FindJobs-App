import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import notFoundMiddlesware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connect.js'
import authenticateUser from './middleware/auth.js'
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()
mongoose.set('strictQuery', false)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use(limiter)



const port = process.env.PORT || 5000

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(express.json())




app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.use(notFoundMiddlesware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}
start()