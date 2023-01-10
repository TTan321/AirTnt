const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const review = require('../../db/models/review');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    let payload = [];
    const reviews = await Review.findAll({
        // attributes: { exclude: ['reviewId'] },
        where: { userId: req.user.id },
    });

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i];
        const user = await User.findOne({ where: { id: review.userId } });
        let userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };

        const spot = await Spot.findOne({ where: { id: review.spotId } });
        let spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
        };

        const images = await Image.findAll({ where: { reviewId: review.id } });
        let imagesDataArray = [];
        if (images[0]) {
            let image = images[i];
            let imageData = {
                id: image.id,
                imageableId: image.reviewId,
                url: image.url
            }
            imagesDataArray.push(imageData);
        } else {
            imagesDataArray.push("No images for this review.")
        }

        let reviewData = {
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: userData,
            Spot: spotData,
            Images: imagesDataArray
        };
        payload.push(reviewData);
    };
    res.status(200);
    return res.json({ "Reviews": payload });
});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findOne({
        // attributes: { exclude: ['reviewId'] },
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
router.put('/:reviewId', requireAuth, async (req, res) => {
    const findReview = await Review.findOne({
        // attributes: { exclude: ['reviewId'] },
        where: { id: req.params.reviewId }
    });
    if (!findReview) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
    else if (findReview.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    };
    const { review, stars } = req.body;

    if (!review || !stars) {
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        });
    };
    findReview.update({
        review: review,
        stars: stars
    });

    const user = await User.findOne({ where: { id: findReview.userId } });
    let userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const spot = await Spot.findOne({ where: { id: findReview.spotId } });
    let spotData = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
    };

    const images = await Image.findAll({ where: { reviewId: findReview.id } });
    let imagesDataArray = [];
    if (images[0]) {
        let image = images[i];
        let imageData = {
            id: image.id,
            imageableId: image.reviewId,
            url: image.url
        }
        imagesDataArray.push(imageData);
    } else {
        imagesDataArray.push("No images for this review.")
    }

    let reviewData = {
        id: findReview.id,
        userId: findReview.userId,
        spotId: findReview.spotId,
        review: findReview.review,
        stars: findReview.stars,
        createdAt: findReview.createdAt,
        updatedAt: findReview.updatedAt,
        User: userData,
        Spot: spotData,
        Images: imagesDataArray
    };

    res.status(200);
    return res.json(reviewData);
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findOne({
        // attributes: { exclude: ['reviewId'] },
        where: { id: req.params.reviewId }
    });
    if (!review) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
    review.destroy();
    res.status(200);
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


module.exports = router;
