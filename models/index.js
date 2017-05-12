//Below is the boilerplate for the sequilize to run properly

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

var sequelize = new Sequelize("postgres://ersbfqgxpyatwi:a2b81715c9081156f15dd8ddaa7d2440973df72b6fcf23ea005533dc2b8b824e@ec2-23-21-220-167.compute-1.amazonaws.com:5432/dbo7r6g6hgo1l6",
  { dialect:  'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: true
    }})

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;