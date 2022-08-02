'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 ABC Street",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        lat: 132.465789,
        lng: 98.765432,
        name: "SF Condo",
        description: "2 Bed 1 Bath apartment for rent",
        price: 3000
      },
      {
        ownerId: 2,
        address: "123 EFG Street",
        city: "San Jose",
        state: "CA",
        country: "USA",
        lat: 45.368124,
        lng: 89.932348,
        name: "SJ House",
        description: "3 Bed 2 Bath house for rent",
        price: 3500
      },
      {
        ownerId: 1,
        address: "650 XYZ Street",
        city: "Oakland",
        state: "CA",
        country: "USA",
        lat: 408.408408,
        lng: 24.358139,
        name: "Oakland House",
        description: "2 Bed 1 Bath house for rent",
        price: 2000
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots');
  }
};
