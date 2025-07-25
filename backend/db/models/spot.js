'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(
        models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );
      // Spot.hasMany(
      //   models.Image, { foreignKey: 'spotId', onDelete: 'CASCADE' }
      // );
      // Spot.hasMany(
      //   models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE' }
      // );
      // Spot.belongsTo(
      //   models.User, { foreignKey: 'ownerId', as: 'Owner' }
      // );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    scopes: {
      noTimes: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
    },
    sequelize,
    schema: process.env.SCHEMA,
    modelName: 'Spot',
  });
  return Spot;
};
