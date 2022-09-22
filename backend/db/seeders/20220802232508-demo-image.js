'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 1,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: 'https://images.pexels.com/photos/10628388/pexels-photo-10628388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 3,
        reviewId: 3,
        userId: 1
      },
      {
        url: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 4,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://images.pexels.com/photos/280235/pexels-photo-280235.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 5,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 7,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 9,
        reviewId: null,
        userId: 5
      },
      {
        url: 'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 5
      },
      {
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 11,
        reviewId: null,
        userId: 5
      },
      {
        url: 'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 12,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&w=1600',
        previewImage: true,
        spotId: 13,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 14,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 15,
        reviewId: null,
        userId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images');
  }
};
