const express= require('express');
const router=express.Router();

//import the Person model
const Person=require('../models/person.js');

//post method to add person
router.post('/',async(req,res)=>{
    try{
        const data=req.body;//get data from request body
        
        const newPerson=new Person(data);//create a new instance of Person model
        
        //save the new person to the database
        const response=await newPerson.save();
        console.log('data saved');
        res.status(201).json(response);//send back the saved person data as response
    }

    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to save person data'});
    }
})

//Get method to get the person
router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data retrieved');
        res.status(200).json(data);
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to retrieve person data'});
    }
})

//Get method to get person by work
router.get('/:worktype',async(req,res)=>{
    try{
        const worktype=req.params.worktype;//get work type from request parameters
        if(worktype=='chef' || worktype=='waiter' || worktype=='manager'){
            const data=await Person.find({work:worktype});//find persons with the specified work type
            console.log('data retrieved by work type');
            res.status(200).json(data);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Internal server error'});
    }
});

//put method to update person by id
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//get id from request parameters
        const updatedPersonData=req.body;//get updated data from request body

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//to return the updated document
            runValidators:true//to run schema validators on the updated data
        });//update person data by id

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('person data updated');
        res.status(200).json(response);//send back the updated person data as response
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to update person data'});
    }
});

//delete method to delete person by id
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//get id from request parameters
        const response=await Person.findByIdAndDelete(personId);//delete person by id
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('person data deleted');
        res.status(200).json({message:'Person data deleted successfully'});
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to delete person data'});
    }   
});

//export the router
module.exports=router;