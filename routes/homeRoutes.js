const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/welcome',authMiddleware,(req,res)=>{

    const {userId,username,role} = req.userInfo;
    
    return res.status(200).json({
        message:"welcome to homepages",
        user:{
            _id:userId,
            username:username,
            role:role
        }
    })    
})

module.exports = router;