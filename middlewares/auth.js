const {decodeAcessToken} = require("../utils/helpers");



module.exports = {
    requireAuth : async(req,_,next)=>{
        try{   
            const header = req.headers["Authorization"];
            if(!header) return next("Unauthenticated");
    
            const token = header.split(" ")[1];
            if(!token || typeof token !== "string") return next("Unauthenticated");
    
            const userId = decodeAcessToken(token);
            req.userId = userId;
            return next();
        }catch(err){
            return next(err);
        }
    }
}