'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tablename = 'Bookings'
    await queryInterface.bulkInsert(options, [
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
    options.tablename = 'Bookings'
    await queryInterface.bulkDelete(options);
  }
};
