import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import notFoundMiddlesware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
dotenv.config()
const app = express()
mongoose.set('strictQuery', false)
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
app.use('/api/v1/jobs', jobsRouter)

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