'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );
      // Review.belongsTo(
      //   models.User, { foreignKey: 'userId', onDelete: 'CASCADE' }
      // );
      // Review.hasMany(
      //   models.Image, { foreignKey: 'reviewId', onDelete: 'CASCADE' }
      // );
    }
  }
  Review.init({
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    schema: process.env.SCHEMA,
    modelName: 'Review',
  });
  return Review;
};
