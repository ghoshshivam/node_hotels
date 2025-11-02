const express = require('express');
const app = express();
const db = require('./db.js');
require('dotenv').config();
const passport=require('./auth.js')

const PORT = process.env.PORT || 3000;

//middleware to parse JSON request bodies
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());//saves data in req.body

//import the Person model
const Person = require('./models/person.js');
//import menuitem model/schema
const MenuItem = require('./models/menu.js');

//Middleware function to log request details
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] - Request made to :${req.originalUrl}`);
    next();
}
app.use(logRequest);

//Authenciation using passport
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false},);

//Using the authenciation middleware
app.get('/',function(req,res){
    res.send('Welcome to our Hotel')
})

//import person routes and using it
const personRoutes = require('./routes/personRoutes.js');
app.use('/person',localAuthMiddleware,personRoutes);//using authenciation middleware

//import menu routes and using it
const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu',menuRoutes);
    
app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
})