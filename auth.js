const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person.js');

//middleware for Authenciion
passport.use(new LocalStrategy(async(Username,password,done)=>{
    //auhenciating logic here
    try{
        //console.log('Received credenials',Username,password);
        const user=await Person.findOne({username:Username});
        if(!user){
            return done(null,false,{message :'Incorrect username'})
        }
        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'});
        }
    }catch (err){
        return done(err);
    }
}))

module.exports=passport;//Export configured passport