const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        attributes: { exclude: ['reviewId'] },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
            { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] }
        ],
        where: {
            userId: req.user.id
        },
        group: ['Review.id']
    });
    // const payload = [];
    // const reviews = await Review.findAll({ attributes: ['id', 'review', 'stars', 'userId', 'spotId', 'createdAt', 'updatedAt'], where: { userId: req.user.id } });
    // for (let i = 0; i < reviews.length; i++) {
    //     let review = reviews[i];

    //     const user = await review.getUser({ attributes: { exclude: ['username'] } });
    //     const spot = await review.getSpot({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    //     const image = await review.getImage({ attributes: ['id', ['reviewId', 'imageableId'], 'url'] });
    //     const reviewData = {
    //         id: review.id,
    //         userId: review.userId,
    //         spotId: review.spotId,
    //         review: review.review,
    //         stars: review.stars,
    //         createdAt: review.createdAt,
    //         updatedAt: review.updatedAt,
    //         User: user,
    //         Spot: spot,
    //         Images: image
    //     }
    //     payload.push(reviewData)
    // }
    // const reviews = await Review.findAll({ attributes: { exclude: ['reviewId'] } });
    // const reviews = await Review.findAll();

    res.status(200);
    return res.json({ "Reviews": reviews });
});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findOne({
        attributes: { exclude: ['reviewId'] },
        where: { id: req.params.reviewId }
    });
    if (!review) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    };
    const countImages = await Image.count({
        where: { reviewId: { [Op.eq]: req.params.reviewId } }
    });
    if (countImages > 10) {
        res.status(403);
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        });
    };
    const { url } = req.body;
    const addImage = await Image.create({
        url,
        previewImage: true,
        reviewId: req.params.reviewId,
        userId: req.user.id,
        spotId: review.spotId
    });
    res.status(200);
    return res.json({ "id": addImage.id, "imageableId": req.params.reviewId, "url": addImage.url });
});

// Edit a review
router.put('/:reviewId', requireAuth, async (req, res) => { })



module.exports = router;
