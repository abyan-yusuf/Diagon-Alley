import express from 'express';
const app =  express();
import dotenv from 'dotenv'
dotenv.config()
import colors from 'colors';
const port =  process.env.PORT || 2012
import cors  from 'cors';
import connectDB from './config/db.js';
app.use(express.json());
app.use(cors())
import authRouter from './routes/authRouter.js'
app.use('/api/v1/users', authRouter)

app.get('/', (req, res) => {
    res.send({message: "Welcome to our ecomerce api!"});
})

app.listen(port, async () => {
    console.log(`Your server is running in port ${port}`.cyan.bgGreen.bold)
    await connectDB()
})