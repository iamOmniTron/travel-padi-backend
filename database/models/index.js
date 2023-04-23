'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const {DB_NAME,DB_PASS,DB_USER,DB_HOST} = require("../../defaults");

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS,{
  host:DB_HOST,
  dialect:"mysql",
   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
});
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;