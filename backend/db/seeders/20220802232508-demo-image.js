'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'SFCondo.com',
        previewImage: true,
        spotId: 1,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'SanJoseHouse.com',
        previewImage: true,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: 'oaklandhouse.com',
        previewImage: true,
        spotId: 3,
        reviewId: 3,
        userId: 1
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images');
  }
};
