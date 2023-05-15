const {decodeAcessToken} = require("../utils/helpers");



module.exports = {
    requireAuth : async(req,_,next)=>{
        try{   
            const header = req.headers["authorization"];
            if(!header) return next("Unauthenticated");
            const token = header.split(" ")[1];
            // console.log("token",token)
            if(!token || typeof token !== "string"){
                return next("Unauthenticated");   
            }
            const {id:userId} = decodeAcessToken(token);
            req.userId = userId;
            return next();
        }catch(err){
            return next(err);
        }
    }
}