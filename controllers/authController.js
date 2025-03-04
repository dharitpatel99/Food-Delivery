const User = require('../models/user');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const loginUser = async(req,res)=>{

    try{

        const {username,password} = req.body;

        //check if user existed in db
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user doesn't exist"
            })
        }

        //check if password is correct or not
        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
           return res.status(400).json({
                success:false,
                message:"Incorrect credentials"
            })
        }

        //generate token

        const token = jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        },process.env.JWT_SECRET,
        {expiresIn:'15m'}
    )

    return res.status(200).json({
        success:true,
        message:"user logged in successfully",
        token
    })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }

};

const registerUser = async(req,res)=>{

    try{
        const {username,email,password,role} = req.body;

        //check if user existed
        const existedUser = await User.findOne({$or:[{email},{username}]});
        if(existedUser){
           return res.status(400).json({
                success:false,
                message:"User already existed!!"
            })
        }else{
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser = await User.create({
                username,email,password:hashedPassword,role:role || 'user'
            })

            if(newUser){
               return res.status(201).json({
                    success:true,
                    message:'User registered successfully',
                    data:newUser
                })
            }else{
               return res.status(400).json({
                    success:false,
                    message:"Unable to register user!!"
                })
            }

            

        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }



};

const changePassword = async(req,res)=>{
    try{
        // extract old and new pass
        const {oldPassword,newPassword} = req.body;

        const userId = req.userInfo.userId;
        const user = await User.findById(userId)

        //check old pass is correct
        const passwordCheck = await bcrypt.compare(oldPassword,user.password);

        if(!passwordCheck){
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const newhashedPassword = bcrypt.hashSync(newPassword, salt);

        user.password = newhashedPassword;
        await user.save()

        return res.status(200).json({
            success:true,
            message:"password change successfully"

        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}

module.exports = {loginUser,registerUser,changePassword};