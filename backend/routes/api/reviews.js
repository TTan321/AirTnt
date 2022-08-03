const express = require('express');

const { Review, Spot, User, Image, Booking } = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        attributes: ['id', 'review', 'stars', 'userId', 'spotId', 'createdAt', 'updatedAt'],
        where: {
            userId: req.user.id
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
        ]
    });
    const image = await Image.findOne({
        where: { userId: req.user.id }
    });
    const reviewImage = await Review.findAll({
        where: { id: image.reviewId }
    })

    res.status(200);
    return res.json(image)
});

module.exports = router;
