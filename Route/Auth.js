import express from "express"
const router = express.Router()
import User from "../Models/Users.js"
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'


// register
 router.post("/register" , async (req,res)=>{
    const newUser = new User({
        username :req.body.username,
        email : req.body.email,
        password  : CryptoJS.AES.encrypt(req.body.password , process.env.PASS_SEC).toString()
    });

    try{
        const saveUser =   await newUser.save();
        res.status(201).json(saveUser)

    }
    catch(err){
        res.status(500).json(err)
     
    }

 });




// login
  

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username :req.body.username});

        !user && res.status(401).json("wrong credential")

        const hasspassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const Originalpassword   = hasspassword.toString(CryptoJS.enc.Utf8);
        Originalpassword !== req.body.password && res.status(401).json("wrong credentiale")
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin :user.isAdmin
        },
        process.env.JWT_SEC, {expiresIn:"5d"}
        
        
        );
      
    
        const {password  , ...other} = user._doc
        res.status(200).json({other , accessToken})

    }
    catch(err){
        res.status(500).json(err)

    }
})






 export default router