module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // We're saying that we want our Nerdgirl to have Posts
      classMethods: {
        associate: function(models) {
          // A nerdgirl (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.Nerdgirl, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
