'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        review: 'The condo is very clean.',
        stars: 4,
        userId: 3,
        spotId: 1
      },
      {
        review: 'The house is very new.',
        stars: 5,
        userId: 2,
        spotId: 2
      },
      {
        review: 'The house is a rustic design.',
        stars: 4,
        userId: 1,
        spotId: 3
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};
