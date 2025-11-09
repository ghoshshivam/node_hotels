const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next) =>{

    // Check if Authorization header exists
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    //Exract the jwt token from reques headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }
    try{
        //Verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //Attach user information to the request object
        req.user=decoded;
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid token'});
    }
}

//Function to generate JWT token
const generateToken=(userData)=>{
    //Generate a new jxt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:300000});
}
//exporting the middleware
module.exports={jwtAuthMiddleware,generateToken}