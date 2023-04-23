
module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            unique:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            require:true
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        phone:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            required:true
        },
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    User.associates = (models)=>{
        User.hasMany(models.Bookmark);
        User.hasMany(models.Review);
    }


    return User;
}