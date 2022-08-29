'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://static.dezeen.com/uploads/2020/04/alamo-square-residence-jensen-architects_dezeen_2364_sq6.jpg',
        previewImage: true,
        spotId: 1,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'https://media.california.com/media/_versions/articles/san_jose_neighborhood_guide__2479x1428___v1222x580.jpg',
        previewImage: true,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: 'https://photos.zillowstatic.com/fp/eff2ddd962faec9aa47008124f3f4b95-p_e.jpg',
        previewImage: true,
        spotId: 3,
        reviewId: 3,
        userId: 1
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images');
  }
};
