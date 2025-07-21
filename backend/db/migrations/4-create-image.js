'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: 'Users', key: 'id' },
        // onDelete: 'CASCADE',
        // hooks: true
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: { model: 'Reviews', key: 'id' },
        // onDelete: 'CASCADE',
        // hooks: true
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: 'Spots', key: 'id' },
        // onDelete: 'CASCADE',
        // hooks: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
