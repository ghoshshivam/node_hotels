const express = require('express');
const app = express();
const db = require('./db.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//middleware to parse JSON request bodies
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());//saves data in req.body

//import the Person model
const Person = require('./models/person.js');

//import menuitem model/schema
const MenuItem = require('./models/menu.js');

app.get('/',function(req,res){
    res.send('Welcome to our Hotel')
})

//import person routes and using it
const personRoutes = require('./routes/personRoutes.js');
app.use('/person',personRoutes);

//import menu routes and using it
const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu',menuRoutes);
    
app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
})