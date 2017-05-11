module.exports = function(sequelize, DataTypes) {
  var Nerdgirl = sequelize.define("Nerdgirl", {
    // Giving the Nerdgirl model a name of type STRING
    name: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Nerdgirl to have entries
      classMethods: {
        associate: function(models) {
          // Associating specofic Nerdgirl with her Entry
          // When an Nerdgirl is deleted, also delete any associated Posts
          Nerdgirl.hasMany(models.Post, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Nerdgirl;
};