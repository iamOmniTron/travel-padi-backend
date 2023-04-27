


module.exports = (sequelize,DataTypes)=>{
    const Bookmark = sequelize.define("Bookmark",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    Bookmark.associate = (models)=>{
        Bookmark.belongsTo(models.Place);
        Bookmark.belongsTo(models.User);
    }


    return Bookmark;
}