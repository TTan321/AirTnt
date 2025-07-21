'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  options.tablename = 'Spots';
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 ABC Street",
        city: "San Francisco",
        state: "California",
        country: "USA",
        lat: 132.465789,
        lng: 98.765432,
        name: "Modern Condo in Mission Rock",
        description: "Brand New condo located in the up and coming neighborhood of mission bay in San Francisco.",
        price: 400
      },
      {
        ownerId: 2,
        address: "123 EFG Street",
        city: "San Jose",
        state: "California",
        country: "USA",
        lat: 45.368124,
        lng: 89.932348,
        name: "Entire house in San Jose",
        description: "Nice 3 bedroom 2 bathroom house in a quiet neighborhood in San Jose.",
        price: 300
      },
      {
        ownerId: 1,
        address: "650 XYZ Street",
        city: "Oakland",
        state: "California",
        country: "USA",
        lat: 408.408408,
        lng: 24.358139,
        name: "Nice house near piedmont hills",
        description: "Located near piedmont hills. Close to many hiking trails and beautiful views of the entire San Francisco bay.",
        price: 450
      }
      ,
      {
        ownerId: 2,
        address: "456 Tree Street",
        city: "Monterey Park",
        state: "California",
        country: "USA",
        lat: 118.4865,
        lng: 133.789415,
        name: "House in Monterey Park",
        description: "Nice house with 3 Bedroom and 3 Bathroom in a nice quiet neighborhood.",
        price: 350
      },
      {
        ownerId: 3,
        address: "21 Jump Street",
        city: "Malibu",
        state: "California",
        country: "USA",
        lat: 21.212121,
        lng: 21.212121,
        name: "Malibu Beach House",
        description: `4 bedroom 3 bathroom beach house in Malibu. Stay here and catch some up and crack a corona.`,
        price: 600
      },
      {
        ownerId: 3,
        address: "1 A lane",
        city: "Mountain Village",
        state: "Colorado",
        country: "USA",
        lat: 123.45631,
        lng: 794.23154,
        name: "House in Nature",
        description: `Beautiful home located in Mountain Village. Look no further for a place to stay in the wilderness.`,
        price: 299
      },
      {
        ownerId: 4,
        address: "789 Sand Street",
        city: "Silver Gate",
        state: "Montana",
        country: "USA",
        lat: 781.2378,
        lng: 95.41658,
        name: "Cabin in the Mountains",
        description: `Great views of the rocky mountains and located near the entrance to Yellowstone national park.`,
        price: 150
      },
      {
        ownerId: 4,
        address: "23 Water Way",
        city: "Miami",
        state: "Florida",
        country: "USA",
        lat: 123.41681,
        lng: 89.12387,
        name: "Nice House in Venetian Island",
        description: `This gorgeous and nearly perfect house will stun you with its modern and dazzling interior finishes.`,
        price: 450
      },
      {
        ownerId: 5,
        address: "89 Snow Lane",
        city: "Riviera Maya",
        state: null,
        country: "Mexico",
        lat: 45.1354,
        lng: 789.13481,
        name: "Beautiful Modern home on the water",
        description: `Perfect place to stay and soak up the sun.`,
        price: 550
      }, {
        ownerId: 5,
        address: "23 Pine Rd",
        city: "Vancouver",
        state: null,
        country: "Canada",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Nice Apartment in downtown",
        description: `Chill place to stay here in Vancouver. Located near many convience stores and public transit.`,
        price: 250
      },
      {
        ownerId: 5,
        address: "75 Blue Way",
        city: "Poole",
        state: null,
        country: "United Kingdom",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Modern House in Poole, UK",
        description: `New Modern home located in the middle of Poole. Located near the water with access to ferries and beaches.`,
        price: 500
      },
      {
        ownerId: 4,
        address: "45698 Apple Street",
        city: "South Lake Tahoe",
        state: "California",
        country: "USA",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Nice house with view of lake.",
        description: `5 bedroom and 3 bathroom house with a stunning view of the lake a top a hill.`,
        price: 600
      },
      {
        ownerId: 3,
        address: "6 Iron Rd.",
        city: "Oslo",
        state: null,
        country: "Norway",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Small Cabin in Oslo",
        description: `Small resting place to relax after roaming the mountains here in Oslo.`,
        price: 100
      },
      {
        ownerId: 2,
        address: "6 Red Lane.",
        city: "Atherton",
        state: "California",
        country: "USA",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Beautiful House in Atherton",
        description: `Perfect place for a large to stay.`,
        price: 600
      },
      {
        ownerId: 1,
        address: "7894 Green Street",
        city: "Reno",
        state: "Neveda",
        country: "USA",
        lat: 135.2318741,
        lng: 18.153541,
        name: "Entire House in Reno",
        description: `Located 20 mins from the strip and near many hiking trails in the Mt. Rose wilderness.`,
        price: 300
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots');
  }
};
