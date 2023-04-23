const {Router} = require("express");
const { signup, login, profile } = require("../controllers/user");
const { requireAuth } = require("../middlewares/auth");


const router = Router();

router.get("/",(_,res)=>{
    return res.json({
        success:true,
        message:"Test from server"
    })
})

// USER ROUTES
router.post("/api/signup",signup);
router.post("/api/login",login);
router.get("/api/profile",requireAuth,profile);



module.exports = router;