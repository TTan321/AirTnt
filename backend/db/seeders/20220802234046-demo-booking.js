'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: 2022 - 12 - 21,
        endDate: 2022 - 12 - 31
      },
      {
        spotId: 2,
        userId: 1,
        startDate: 2022 - 10 - 25,
        endDate: 2022 - 10 - 31
      },
      {
        spotId: 3,
        userId: 2,
        startDate: 2022 - 11 - 21,
        endDate: 2022 - 11 - 31
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings');
  }
};
