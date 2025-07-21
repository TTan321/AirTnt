'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  options.tablename = 'Reviews'
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        review: 'This house was perfect for my group. A/C was clutch during my stay.',
        stars: 4,
        userId: 1,
        spotId: 2
      },
      {
        review: 'Mediocre at best. Nothing special about this place.',
        stars: 3,
        userId: 3,
        spotId: 2
      },
      {
        review: 'Meh... Was not bad, but nothing impressive about this place.',
        stars: 3,
        userId: 2,
        spotId: 1
      },
      {
        review: 'Location is perfect for my trip to watch the warriors play at chase center.',
        stars: 5,
        userId: 3,
        spotId: 1
      },
      {
        review: 'I loved the view here, there are plenty of view points to take pictures.',
        stars: 5,
        userId: 3,
        spotId: 3
      },
      {
        review: 'This place is okay. It was hot here... A/C was broken...',
        stars: 1,
        userId: 2,
        spotId: 3
      },
      {
        review: 'I loved my stay here in this very spacious house.',
        stars: 5,
        userId: 1,
        spotId: 4
      },
      {
        review: 'OMG!!! This place cannot be beat for the location. BEST BANG FOR YOUR BUCK!',
        stars: 5,
        userId: 1,
        spotId: 5
      },
      {
        review: 'This place really enhanced my trip. I loved it here.',
        stars: 5,
        userId: 4,
        spotId: 6
      },
      {
        review: 'Very convenient and much cheaper than staying inside the national park.',
        stars: 5,
        userId: 4,
        spotId: 7
      },
      {
        review: 'Overrated, I would rather stay at a hotel next time...',
        stars: 2,
        userId: 4,
        spotId: 8
      },
      {
        review: 'Highly recommended, best vacation ever staying here.',
        stars: 5,
        userId: 1,
        spotId: 9
      },
      {
        review: 'Very convenient place to stay, but thats about it.',
        stars: 4,
        userId: 2,
        spotId: 10
      },
      {
        review: 'I loved it here, just wow WOW!!!',
        stars: 5,
        userId: 3,
        spotId: 11
      },
      {
        review: 'Beautiful view of the lake and the mountains from every window.',
        stars: 5,
        userId: 5,
        spotId: 12
      },
      {
        review: 'Regret it, just stay in the city',
        stars: 2,
        userId: 5,
        spotId: 13
      },
      {
        review: 'Nothing really to do here, nice house though.',
        stars: 4,
        userId: 5,
        spotId: 14
      },
      {
        review: 'Solid place to stay, nice and quiet.',
        stars: 4,
        userId: 2,
        spotId: 15
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};
