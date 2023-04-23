
module.exports = (sequelize,DataTypes)=>{
    const Review = sequelize.define("Review",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        review:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        ratings:{
            type:DataTypes.INTEGER,
        }
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    Review.associates = (models)=>{
        Review.belongsTo(models.User);
        Review.belongsTo(models.Place);
    }

    return Review;
}