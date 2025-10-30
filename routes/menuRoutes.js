const express = require('express');
const router = express.Router();

//import the MenuItem model
const MenuItem = require('../models/menu.js');

//Post method to add menu item
router.post('/',async(req,res)=>{
    try{
        const data=req.body;//get data from request body
        
        const newMenuItem=new MenuItem(data);//create a new instance of MenuItem model
        //save the new menu item to the database
        const response=await newMenuItem.save();
        console.log('menu item saved');
        res.status(200).json(response);//send back the saved menu item data as response
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to save menu item data'});
    }
});

//Get method to get menu items
router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('menu items retrieved');
        res.status(200).json(data);
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Failed to retrieve menu items data'});
    }
});

//get method to get menu item by taste
router.get('/:taste',async(req,res)=>{
    const taste=req.params.taste;//get taste from request parameters
    try{
        if(taste=='sweet' || taste=='spicy' || taste=='sour'){
            const data=await MenuItem.find({taste:taste});//find menu items with the specified taste
            console.log('menu items retrieved by taste');
            res.status(200).json(data);
        }else{
            res.status(404).json({error:'No menu items found for the specified taste'});
        }
    }
    catch(err){
        console.log('err');
        res.status(500).json({error:'Internal server error'});
    }
});

//export the router
module.exports = router;