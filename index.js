import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { errorMiddleware } from './src/middleware/error.middleware.js'
import authRouter from './src/routers/auth.router.js'
import taskRouter from './src/routers/task.router.js'
import { connection } from './src/utils/db.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:8081',
		credentials: true,
	})
)

app.use('/api', authRouter)
app.use('/api', taskRouter)
app.use(errorMiddleware)

connection()
app.listen(PORT, () => {
	console.log('server is running', PORT)
})
