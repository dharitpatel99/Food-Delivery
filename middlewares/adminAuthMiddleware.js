const authAdminMiddleware = (req,res,next) =>{
    if(req.userInfo.role != 'admin'){
        return res.status(403).json({
            success:false,
            message:"Access Denied!! admin not found"
        })
    }
    next();
}

module.exports = authAdminMiddleware;