import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    products: [
        {

            productID :{
                type : String,
            },
            quantity :{
                type : Number,
                default : 1,
            }
        }
    ]
  
},
    { timestamps: true }
)



const userModel = mongoose.model("Cart" , cartSchema)
   

export default userModel