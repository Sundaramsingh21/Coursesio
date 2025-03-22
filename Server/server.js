import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Configs/mongodb.js'
import { clerkWebhooks } from './Controllers/webhooks.js'

//Initilize Express
const app= express()

//Connect to DB
await connectDB()


//Middlewares
app.use(cors())

//Routes
// path : req is pass into json : controller
app.post('/clerk', express.json(), clerkWebhooks)
app.get('/', (req,res)=>{
    res.send("Server Started")
})

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})