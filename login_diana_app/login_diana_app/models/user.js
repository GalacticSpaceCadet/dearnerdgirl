module.exports = function(sequelize, Sequelize){
//pass sequelize.define name of model and object describing model's schema
  var User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      // flag that restricts username from being entereted if there is no text value
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
    // ,
    // // email validation
    // email: {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    //   default:'derp'
    // }
    // ,
    // // password hash
    // password: {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // }
  });
// returns an object stored inside User variable
  return User;
};
