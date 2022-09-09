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
      ,
      {
        ownerId: 2,
        address: "456 Tree Street",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 118.4865,
        lng: 133.789415,
        name: "Los Angeles House",
        description: "5 Bedroom 3 Bathroom house for rent",
        price: 4000
      },
      {
        ownerId: 3,
        address: "21 Jump Street",
        city: "Metropolis",
        state: "Evergreen",
        country: "USA",
        lat: 21.212121,
        lng: 21.212121,
        name: "Church",
        description: `The Korean 'Aroma Of Christ Church'`,
        price: 2121
      },
      {
        ownerId: 3,
        address: "879 BatMan Street",
        city: "Bristol Township",
        state: "New Jersey",
        country: "USA",
        lat: 123.45631,
        lng: 794.23154,
        name: "Wayne Manor",
        description: `Wayne Manor is the stately residence of billionaire Bruce Wayne, secretly Batman.`,
        price: 100000
      },
      {
        ownerId: 4,
        address: "789 Sand Street",
        city: "Pacifca",
        state: "CA",
        country: "USA",
        lat: 781.2378,
        lng: 95.41658,
        name: "Pineapple House",
        description: `House, but also Pineapple'`,
        price: 2314
      },
      {
        ownerId: 4,
        address: "23 Bush Street",
        city: "City",
        state: "State",
        country: "USA",
        lat: 123.41681,
        lng: 89.12387,
        name: "Home",
        description: `This gorgeous and nearly perfect house will stun you with its modern and dazzling interior finishes.`,
        price: 8952
      },
      {
        ownerId: 5,
        address: "89 Snow Lane",
        city: "Aspine",
        state: "Colorado",
        country: "USA",
        lat: 45.1354,
        lng: 789.13481,
        name: "Cabin",
        description: `Cozy Cabin perfect for lodging during ski trips.`,
        price: 8952
      }, {
        ownerId: 5,
        address: "75 Blue Way",
        city: "City",
        state: "State",
        country: "USA",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Mansion",
        description: `VERY VERY VERY VERY VERY nice place to stay for a vacation.`,
        price: 7205
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots');
  }
};
