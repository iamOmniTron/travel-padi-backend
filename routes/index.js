const {Router} = require("express");
const { signup, login, profile, bookmarkPlace, getBookmarks, addLocation } = require("../controllers/user");
const { requireAuth } = require("../middlewares/auth");


const router = Router();

// PING SERVER
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


// BOOKMARK
router.post("/api/bookmark",requireAuth,bookmarkPlace)
router.get("/api/bookmarks",requireAuth,getBookmarks);

// PLACES
router.post("/api/place/add",requireAuth,addLocation);



module.exports = router;