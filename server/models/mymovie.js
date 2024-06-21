"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyMovie.belongsTo(models.User, { foreignKey: "UserId" });
      MyMovie.belongsTo(models.Movie, { foreignKey: "MovieId" });
    }
  }
  MyMovie.init(
    {
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyMovie",
    }
  );
  return MyMovie;
};
