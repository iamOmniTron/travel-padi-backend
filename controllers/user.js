const db = require("../database/models");
const { hashPassword, isPasswordMatch, generateAccessToken } = require("../utils/helpers");




module.exports = {

    signup: async(req,res,next)=>{
        const {name,email,phone,password} = req.body;
        try{
            const isExist = await db.User.findOne({email});
            if(isExist) return next(err.message);
        }catch(err){
            return next('Error querying user details')
        }
        const hashedPassword = await hashPassword(password);
        try{
            const newUser = await db.User.create({name,email,phone,password:hashedPassword});
            if(!newUser) return next("Error during signup");

            return res.json({
                success:true,
                message:"signup successful"
            })
        }catch(err){
            return next(err.message)
        }
    },
    login: async(req,res,next)=>{
        const {email,password} = req.body;
        console.log(email,password);
        try{
            const user = await db.User.findOne({where:{email}});
            if(!user) return next("Invalid user");
            
            const isPassMatched = isPasswordMatch(password,user.password);

            if(!isPassMatched) return next("Invalid email/password");
            const token = generateAccessToken(user.id);
            return res.json({
                success:true,
                data:token
            })
        }catch(err){
            return next(err.message);
        }
    },
    profile: async(req,res,next)=>{
        const {userId} = req;
        console.log("user id",userId)
        try{
            const user = await db.User.findByPk(userId);
            const {name,phone,email} = user;
            console.log("name",name);
            return res.json({
                success:true,
                data:{name,email,phone}
            })
        }catch(err){
            return next(err.message);
        }
    }
}