const db = require("./models");



const startDatabase = async()=>{
    try{
        console.log('authenticating database');
        await db.sequelize.authenticate();
        console.log("connecting to database");
        await db.sequelize.sync({force:true});
        console.log("database connection established successfully");
    }catch(err){
        console.log(err.message);
    }
}

module.exports = startDatabase;