


module.exports = (sequelize,DataTypes)=>{
    const Bookmark = sequelize.define("Bookmark",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autIncrement:true
        }
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    Bookmark.associates = (models)=>{
        Bookmark.belongsToMany(models.Place);
        Bookmark.belongsToMany(models.Users);
    }


    return Bookmark;
}