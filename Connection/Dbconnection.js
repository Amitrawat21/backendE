import mongoose from "mongoose"

const  DB = "mongodb+srv://AmitRawat:AmitRawat21@cluster0.v2znl.mongodb.net/shoppingwebsite?retryWrites=true&w=majority"
mongoose.connect(DB , {
    useUnifiedTopology :true,
    useNewUrlParser : true

}).then(()=>console.log("database Connected"))

.catch((error)=>{
     console.log(error)
})
    