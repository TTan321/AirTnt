'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2022-09-02'),
        endDate: new Date('2022-09-21'),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('2022-10-02'),
        endDate: new Date('2022-11-21'),
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2022-11-02'),
        endDate: new Date('2022-12-21'),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings');
  }
};
