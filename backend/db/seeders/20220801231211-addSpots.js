'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
        "address": "123 ABC Street",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.485258,
        "lng": -122.445627,
        "name": "ABC Mart",
        "description": "Grocery Store on ABC street",
        "price": 250
      },
      {
        "address": "465 Lombard Street",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "Apartment",
        "description": "2Bed 1Bath for rent",
        "price": 3000
      },
      {
        "address": "789 Moraga Street",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.468413,
        "lng": -122.879645,
        "name": "House",
        "description": "3Bed 2Bath for rent",
        "price": 4500
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Spots', null, {});

  }
};
