const mongoose=require('mongoose');

//define the mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels';//replavce mydatabase with your database name

//set mongodb connecion
//mongoose.connect(mongoURL,{
  //  useNewUrlParser:true,
    //useUnifiedTopology:true
//});

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//define event listeners for the connection object
//db.on('connected',()=>{
  //  console.log('Mongodb connected successfully');
//});

//db.on('error',(err)=>{
  //  console.log('Mongodb connection error:',err);
//});

db.on('disconnected',()=>{
    console.log('Mongodb disconnected');
});



//Export the connection object
module.exports=db;

