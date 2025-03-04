const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const authAdminMiddleware = require('../middlewares/adminAuthMiddleware')

const router = express.Router();

router.get('/welcome',authMiddleware,authAdminMiddleware,(req,res)=>{

    const {userId,username,role} = req.userInfo;

    return res.status(200).json({
        message:"welcome to admin",
        user:{
            _id:userId,
            username:username,
            role:role
        }
    })    
})

module.exports = router;