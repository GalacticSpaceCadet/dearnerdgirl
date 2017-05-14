module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    name: DataTypes.STRING
  },
  {
      classMethods: {
        associate: function(models) {
          Author.hasMany(models.Post, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Author;
};
