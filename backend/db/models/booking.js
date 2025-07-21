'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Booking.belongsTo(
      //   models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' }
      // );
      // Booking.belongsTo(
      //   models.User, { foreignKey: 'userId', onDelete: 'CASCADE' }
      // );
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    schema: process.env.SCHEMA,
    modelName: 'Booking',
  });
  return Booking;
};
