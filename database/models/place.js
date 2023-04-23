


module.exports = (sequelize,DataTypes)=>{
    const Place = sequelize.define("Place",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        logitude:DataTypes.STRING,
        latitude:DataTypes.STRING
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    Place.associate = (models)=>{
        Place.hasMany(models.Bookmark);
        Place.hasMany(models.Review);
    }

    return Place;
}