const {Router} = require("express");
const { signup, login, profile, bookmarkPlace, getBookmarks, addLocation,getPlaces } = require("../controllers/user");
const {rate} = require("../controllers/review");
const { requireAuth } = require("../middlewares/auth");


const router = Router();

// PING SERVER
router.get("/",(_,res)=>{
    return res.json({
        success:true,
        message:"Test from server"
    })
})

router.post("/",(req,res)=>{
    console.log("body",req.body);
    return;
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
router.get("/api/recommended-places",requireAuth,getPlaces);

// RATE & REVIEW
router.post("/api/rate/:placeId",requireAuth,rate);



module.exports = router;