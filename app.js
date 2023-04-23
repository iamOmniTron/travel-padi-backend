const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const startDatabase = require("./database/db_init");
const router = require("./routes");



const app = express();

startDatabase();

// TO LOG INFO
app.use(logger('dev',{immediate:true}));

// ALLOWS CROSS-ORIGIN RESOURCE SHARING TO MOBILE APP
app.use(cors({origin:"*"}));

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/",router);


// ROUTER MOUNTED ON APPLICATION SERVER

// GLOBAL ERROR HANDLER TO HANDLE UNCAUGHT ERROR
app.use((err,_,res,next)=>{
    if(err){
        if(err instanceof Error){
            return res.json({
                success:false,
                message:"Internal Server Error"
            })
        }

        return res.json({
            success:false,
            message:err
        })
    }
    return next();
});


module.exports = app;