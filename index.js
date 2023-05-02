import express from 'express'
import Authrouter from "./Route/Auth.js"
import databaseconn from './Connection/Dbconnection.js'
import userOrder from "./Route/Order.js"
import dotenv from "dotenv"
import userRoute from "./Route/User.js"
import ProductRoute from "./Route/Product.js"
import CartRouter from "./Route/Cart.js"
import StrieRoute from "./Route/stripe.js"
import cors from "cors"

dotenv.config()
const app = express()

 

//connect mongoose


databaseconn(process.env.MONGO_URL)


// route
  app.use(cors());
  app.use(express.json()) 
  app.use("/api/auth", Authrouter)
  app.use("/api/users", userRoute);
  app.use("/api/products" , ProductRoute)
  app.use("/api/Cart" ,CartRouter)
  app.use("/api/checkout" , StrieRoute)
  app.use("/api/order" , userOrder)

  app.use("/" , (req,res)=>{
    res.json({message : "hello"})
})

        

    
app.listen(process.env.PORT || 5000,  ()=>{
    console.log("backend server is running")
})

