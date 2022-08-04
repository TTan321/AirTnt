const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    let review = {};
    const reviews = await Review.findAll({
        attributes: ['id', 'review', 'stars', 'userId', 'spotId', 'createdAt', 'updatedAt'],
        where: {
            userId: req.user.id
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
            // { model: Image, attributes: ['id'] }
        ],
        // raw: true
    });
    const images = await Image.findAll({
        attributes: ['id', ['reviewId', 'imageableId'], 'url'],
        where: { userId: req.user.id },
        // raw: true
    });
    // const reviewImage = await Booking.findAll({
    //     // include: { model: Image, as: 'Images', attributes: ['id'] }
    // });
    // reviews;
    review.reviews = reviews;
    // reviews = reviews.toJSON();
    // reviews[0].image = image;
    // review.reviews.images = { 'id': image[0].id, 'imageableId': image[0].imageableId, 'url': image[0].url };

    res.status(200);
    return res.json(review)
})



module.exports = router;
