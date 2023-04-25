const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require("../defaults");


module.exports = {
    hashPassword: async (password)=> await bcrypt.hash(password,10),
    isPasswordMatch: async (password,hashed)=> await bcrypt.compare(password,hashed),
    generateAccessToken: (payload)=> jwt.sign({...payload},TOKEN_SECRET,{expiresIn:"2d"}),
    decodeAcessToken: (token)=>jwt.verify(token,TOKEN_SECRET),
}