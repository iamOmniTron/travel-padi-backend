const db = require("../database/models");

module.exports = {
    rate:async(req,res,next)=>{
        const {userId} = req;
        const {placeId} = req.params;
        const {ratings,review} = req.body;

        try{
            console.log("rating")
            const newRating = await db.Review.create({ratings,review,UserId:userId,PlaceId:+(placeId)});
            if(!newRating) return next("Error rating location");
            console.log("done")
            return res.json({
                success:true,
                message:'Rating successful'
            })
        }catch(err){
            return next(err.message)
        }
    },
    getRate: async(req,res,next)=>{
        const {rateId} = req.params;
        try{
        const rate = await db.Review.findByPk(+rateId);
        return res.json({
            success:true,
            data:rate
        })
        }catch(err){
            return next(err.message);
        }
    },
    editRate: async (req,res,next)=>{
        const {rateId} = req.params;

        try{
            const isEdited = await db.Review.update({...req.body},{where:{id:+rateId}});
            if(!isEdited) throw new Error('Error updating review');

            return res.json({
                success:true,
                message:"Review updated successfully"
            })
        }catch(err){
            return next(err.message);
        }
    },
    deleteRate: async (req,res,next)=>{
        const {rateId}= req.params;

        try{
            const isDeleted = await db.Review.destroy({where:{id:rateId}});

            if(!isDeleted) throw new Error('Error deleted review');

            return res.json({
                success:true,
                message:'Review deleted successfully'
            })
        }catch(err){
            return next(err.message);
        }
    }
}