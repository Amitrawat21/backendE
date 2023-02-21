import mongoose from "mongoose"

const databaseconn = async (MONGO_URL)=>{
    try{
        const DB_OPTION = {
            dbName :'ecommerce',
        }
        await mongoose.connect(MONGO_URL , DB_OPTION)
        console.log('database connect sucessfully')
    }
    catch(err){
        console.log(err)
    }
    
}
 export default databaseconn