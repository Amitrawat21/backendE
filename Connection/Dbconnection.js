import mongoose from "mongoose"

const DB =  process.env.DB_HOST
mongoose.connect(DB , {
    useUnifiedTopology :true,
    useNewUrlParser : true

}).then(()=>console.log("database Connected"))

.catch((error)=>{
     console.log(error)
})
    