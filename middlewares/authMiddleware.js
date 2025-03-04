const jwt = require('jsonwebtoken');

const authMiddleware = (req,res, next) => {
 
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Access denied!! No token found"
            })
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        req.userInfo = decodeToken;    
        
      next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
  
};

module.exports = authMiddleware;
