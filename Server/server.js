import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Configs/mongodb.js'
// import { clerkWebhooks, stripeWebhooks } from './Controllers/webhooks.js'
import educatorRouter from './Routes/educatorRoute.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './Configs/cloudinary.js'
import courseRouter from './Routes/courseRoute.js'
import userRouter from './Routes/userRoute.js'

//Initilize Express
const app= express()

//Connect to DB
await connectDB()
await connectCloudinary()


//Middlewares
app.use(cors())
app.use(clerkMiddleware());

//Routes
// path : req is pass into json : controller
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user',express.json(), userRouter )
// app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);



app.get('/', (req,res)=>{
    res.send("Server Started")
})

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
