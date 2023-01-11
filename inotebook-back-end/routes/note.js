const express=require('express');
const router=express.Router();
const Note=require('../models/Note')
const fetchuser =require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');



// fetch notes
router.get('/fetchnotes',fetchuser,async (req,res)=>
                        {
                           const notes = await Note.find({user:req.user.id})
                           res.send(notes)
                        });


//create note
router.post('/createnote',fetchuser,
              [
                    // checking validations of checks
                body('title',"min 3 characters").isLength({min:3}),
                body('description',"min 5 characters").isLength({min:5}),
  
               ]
               ,async (req,res)=>
                        {
                         // Finds the validation errors in this request and wraps them in an object with handy functions
                            const errors = validationResult(req);
                            if (!errors.isEmpty())
                             {
                              return res.status(400).json({ errors: errors.array() });
                            } 

                          else
                          {
                            try
                            {
                              
                               const {title,description,tag}=req.body; // dis-structuring req.body
                               
                               //creating a note
                               const  note= await Note.create(
                                {
                                    title,
                                    description,
                                    tag,
                                    user:req.user.id //tading user id from req.user.body
                                })
                             res.json(note);
                            } 

                           catch(error)
                           {
                                 console.log(error.messsage);
                                 return res.status(404).send("some error occured")                           
                           }
                          } 
                        });

//update note
router.put('/updatenote/:id',fetchuser,[
                    // checking validations of checks
                body('title',"min 3 characters").isLength({min:3}),
                body('description',"min 5 characters").isLength({min:5}),
  
               ], async (req,res)=>
                                              {
                                                // finding notes by id from url
                                                let note = await Note.findById(req.params.id);
                                                if(!note) // if note doesn't found by id show error
                                                {
                                                  return res.status(400).send("note doesn't found");
                                                }
                                                if(req.user.id!=note.user.toString())
                                                { // if login user doesn't have access of that note

                                                  return res.status(401).send("not allowed");
                                                }
                                                
                                                // distructuring req.body
                                                const {title,description,tag}=req.body;
                                                //creating a newnote from updated data
                                                const newnote={};
                                                if(title){newnote.title=title;}
                                                if(description){newnote.description=description;}
                                                if(tag){newnote.tag=tag;}

                                                //finding and updating note
                                                note= await Note.findByIdAndUpdate(req.params.id,{ $set: newnote}, {new:true});
                                                res.json(note);
                                              })

 //delete note
router.delete('/deletenote/:id',fetchuser, async (req,res)=>
                                              {
                                                // finding notes by id from url
                                                let note = await Note.findById(req.params.id);
                                                if(!note) // if note doesn't found by id show error
                                                {
                                                  return res.status(400).send("note doesn't found");
                                                }
                                                if(req.user.id!=note.user.toString())
                                                { // if login user doesn't have access of that note

                                                  return res.status(401).send("not allowed");
                                                }
                                              
                                                //finding and deletings note
                                                note= await Note.findByIdAndDelete(req.params.id,)
                                                res.send("deleted successfully");
                                              })                                             




module.exports= router;