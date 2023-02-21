import { verifyTokenAndAuthorization ,verifyTokenAndAdmin} from "../Route/VerifyToken.js"
import express from "express"
const router = express.Router()
import User from "../Models/Users.js"

// update
router.put("/:id" , verifyTokenAndAuthorization , async(req,res)=>{
    // if(req.body.password){
    //     req.body.password =  CryptoJS.AES.encrypt(req.body.password , process.env.PASS_SEC).toString()
    // }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set :req.body
        },
        {new : true}
        );

        res.status(200).json(updateUser)

    }

    catch(err){
        res.status(500).json(err)

    }
});


// delete


router.delete("/:id" , verifyTokenAndAuthorization, async(req,res)=>{

    try{
await User.findByIdAndDelete(req.params.id)
res.status(200).json("user has been deleted")

    }

    catch(err){
        res.status(500).json(err)

    }

})



// get user
router.get("/find/:id" ,verifyTokenAndAdmin, async(req,res)=>{

    try {

const user = await User.findById(req.params.id)

console.log(user)


const {password, ...others} = user._doc;

res.status(200).json(others)
console.log(others)


    }

    catch(err){
        res.status(500).json(err)

    }

})







// get all user
router.get("/" ,verifyTokenAndAdmin, async(req,res)=>{

    try{
const users = await User.find()

res.status(200).json(users)

    }

    catch(err){
        res.status(500).json(err)

    }

})








// get all  user by query
router.get("/" ,  async(req,res)=>{
    const query = req.query.new;

    try{
const users = query ? await User.find().sort({_id : -1}).limit(2) : await User.find()
res.status(200).json(users)

    }

    catch(err){
        res.status(500).json(err)

    }

})




// get all user by stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


export default router