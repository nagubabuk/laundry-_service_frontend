const express = require("express");
const User = require("../models/register");
 const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const SECRET = "RESTAPI";


router.post("/register", async(req,res)=>{
   console.log(req.body)
  
   const {name,email,password,phone,state,district,address,pincode}=req.body;
   if (!name || !email || !password || !phone || !state || !district || !address|| !pincode ){
       return res.status(422).json({error:"Please fill the required fields"})
   }
   bcrypt.hash(password, 10, async function(err, hash) {
    if (err) {
        return res.status(400).json({
            status: "failed",
            message: "invalid details"
        })
    }
    console.log("creating user");
   
   try{
       const userExist = await User.findOne({email:email});
       if (userExist){
           return res.status(422).json({error:"User already registered"});
       }
       const user = new User({name,email,password:hash,phone,state,district,address,pincode});
       // await user.generateAuthToken()
       await user.save()
           res.status(201).json({message:"registered successful"});
       
    }
    catch(err){
       console.log(err);
    } 
   });
});

//login page
router.post('/login', async (req,res) =>{
   console.log(req.body)
   try{
       const {email,phone,password} = req.body;
       if (password){
           if(email){
               var user = await User.findOne({email: email})
           }
           else if (phone){
               var user = await User.findOne({phone: phone})
           }
           else{
               return res.status(422).json({error:"Please fill the data"})
           }
           console.log(user)
           if (user){
             bcrypt.compare(password, user.password).then(function(result){
                if (result){
                    var token = jwt.sign({
                           exp: Math.floor(Date.now() / 1000) + (6000 * 60),
                           data: user._id
                         }, SECRET);
                       res.json({
                           status: "success",
                           Token: token,
                           User: user
                       })
                   }else{
                   res.status(400).json({error:"Please Enter correct Password", Entered: result})
                  
               }
               })

               
           }else{
               res.status(400).json({error:"invalid credentials "})
           }
       }
       else{
           return res.status(422).json({error:"Please enter the password"})
       } 
   }
   catch(err){
           console.log(err)
       }
});


module.exports = router;

   