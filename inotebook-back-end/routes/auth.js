const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const fetchuser =require('../middlewares/fetchuser');

const scretekey="hselloIam$fine";


//Route 1: end point to create user api/auth/createuser
router.post('/createuser',[
                    // checking validations of checks
                body('name',"Enter valid name min 5 and max 20)").isLength({ min: 5 , max:20}),
                body('password',"Enter valid password min 5 and max 10)").isLength({ min: 5, max:10}),
                body('email',"Enter valid Email").isEmail(),
               ],async (req,res)=>
                        {
                          // Finds the validation errors in this request and wraps them in an object with handy functions
                            let success=false; 
                            const errors = validationResult(req);
                            if (!errors.isEmpty()) {
                              return res.status(400).json({ errors: errors.array() });
                            } 

                            else
                            {
                              try
                              {
                                  //checking if user with this email already exists
                                  let user= await User.findOne({email:req.body.email})
                                  if(user)//giving error of uniqueness
                                  {
                                      return res.status(404).json({success,error:"Email Already Exists"})
                                  } 
                            
                                  //create user
                                  
                                  else{
                                        
                                          //passward hashing 
                                            const salt= await bcrypt.genSalt(10);
                                            const SecPass= await bcrypt.hash(req.body.password,salt);
                                          // creaiting usesr
                                          user=  await User.create({
                                                  name: req.body.name,
                                                  password: SecPass,
                                                  email:req.body.email
                                                })

                                        // jwt webtoken
                                        const data={
                                          user:
                                          {
                                             id:user.id
                                          }
                                        }
                                        
                                         const auttoken=jwt.sign(data,scretekey)
                                         success=true;
                                         return  res.json({success,auttoken});
                                      }
                              }
                              catch(error)
                              {
                                 console.log(error.messsage);
                                  return res.status(404).send("some error occured")
                              }
   
                            }
                         }
            )



 // Route 2:end point to create user api/auth/login  
    router.post('/loginuser',[
                    // checking validations of checks
                body('password',"Password couldn't be blanked").exists(),
                body('email',"Enter valid Email").isEmail()
               ],async (req,res)=>
                        {
                          // Finds the validation errors in this request and wraps them in an object with handy functions
                           let success=false; 
                           const errors = validationResult(req);
                            if (!errors.isEmpty()) {
                              return res.status(400).json({ errors: errors.array() });
                            } 

                          else
                          {
                            try
                            {

                                const {email,password}=req.body;  //dis-struructuring req.body
                                let user= await User.findOne({email:email}); //finding user with requested email
                                if(!user) //if email doesn't exist throw error
                                {
                                    return res.status(400).json({success,error:"sorry user doesn't exists please create an accout"});
                                }
                                else // else check for password match
                                {
                                  const pascheck= await bcrypt.compare(password,user.password);
                                  if(pascheck===false)
                                  {
                                    return res.status(400).json({success,error:"incorrect password"})
                                  }
                                  else{

                                        const data=
                                        {
                                          user:
                                                {
                                                  id:user.id
                                                }
                                         }
                                         const auttoken=jwt.sign(data,scretekey);
                                         success=true;
                                         return res.json({success,auttoken});
                                     }
                                }
                           }
                           catch(error)
                           {
                                 console.log(error.messsage);
                                 return res.status(404).send("some error occured")                           
                           }
                          }
                        } 
                      )   
                      
 //Route 3: end point to fetch user details
        
     router.post('/getuser',fetchuser,
                                    async (req,res)=>
                                    { 
                                          try
                                          {
                                           
                                            const userID=req.user.id;
                                            console.log(userID)
                                            const user= await User.findById(userID).select("-passward");
                                            res.send(user);
                                          }

                                          catch(error)
                                          {
                                            console.log(error.messsage);
                                            return res.status(404).send("some error occured") 
                                          }
                                        
                                      
                                    }
               );


router.put('/updateuser',fetchuser, async (req,res)=>
                                              {
                                                let user={};
                                                // distructuring req.body
                                                const {name,password}=req.body;
                                                //creating a newnote from updated data
                                                const newuser={};
                                                if(name){newuser.name=name;}

                                                if(password)
                                                { 
                                                  //passward hashing 
                                                  const salt= await bcrypt.genSalt(10);
                                                  const SecPass= await bcrypt.hash(password,salt);
                                                  newuser.password=SecPass;
                                                }
                                                
                                                //finding and updating note
                                                user= await User.findByIdAndUpdate(req.user.id,{ $set: newuser}, {new:true});
                                                res.json(user);
                                              });

 
router.delete('/deleteuser',fetchuser, async (req,res)=>
                                              {
                                                let success=false;
                                                //finding and deletings note
                                                let user = await User.findByIdAndDelete(req.user.id)
                                              
                                                if(!user) // if note doesn't found by id show error
                                                {
                                                  return res.status(400).json(success);
                                                }
                                                success=true;
                                                res.json({success});
                                              })   


module.exports= router;