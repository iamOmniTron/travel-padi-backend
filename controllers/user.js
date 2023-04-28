const db = require("../database/models");
const { hashPassword, isPasswordMatch, generateAccessToken } = require("../utils/helpers");




module.exports = {

    signup: async(req,res,next)=>{
        const {name,email,phone,password} = req.body;
        try{
            const isExist = await db.User.findOne({where:{email}});
            if(isExist) return next(err.message);
        }catch(err){
            return next('User with email exist')
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
        try{
            const user = await db.User.findOne({where:{email}});
            if(!user) return next("Invalid user");
            
            const isPassMatched = isPasswordMatch(password,user.password);

            if(!isPassMatched) return next("Invalid email/password");
            const token = generateAccessToken({id:user.id});
            console.log(token);
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
        try{
            const user = await db.User.findByPk(userId);
            const {name,phone,email} = user;
            return res.json({
                success:true,
                data:{name,email,phone}
            })
        }catch(err){
            return next(err.message);
        }
    },
    getBookmarks: async (req,res,next)=>{
        const {userId} = req;
        try{
            const bookmarks = await db.Place.findAll({include:[{model:db.Bookmark,include:[{model:db.User,where:{id:userId},required:true}]},{model:db.Review,required:true}]})
            return res.json({
                success:true,
                data:bookmarks
            })
        }catch(err){
            return next(err);
        }
    },
    bookmarkPlace: async (req,res,next)=>{
        const {userId,body} = req;
        try{
            const boookmarked = await db.Bookmark.create({User:userId,Place:body.placeId});
            if(!boookmarked){
                return next("Error bookmarking place")
            }
            return res.json({
                success:true,
                message:"Location bookmarked successfully"
            })
        }catch(err){
            console.log(err)
            return next(err);
        }
    },
    addLocation: async (req,res,next)=>{
        try{
            const isCreated = await db.Place.create({...req.body});
            if(!isCreated){
                return next("error occured")
            }
            return res.json({
                success:true,
                data:isCreated.id
            })
        }catch(err){
            return next(err);
        }
    },
    getPlaces:async (req,res,next)=>{
        try{
            const places = await db.Place.findAll({
                group:"placeId"
            })
            return res.json({
                success:true,
                data:places
            })
        }catch(err){
            return next(err);
        }
    },
}