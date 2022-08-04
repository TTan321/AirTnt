const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { Spot, User, Review, Image, Sequelize, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [Sequelize.literal('Images.url'), 'previewImage'],
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        group: ['spot.id']
    });

    res.status(200);
    return res.json({ "Spots": spots });
});

router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [Sequelize.literal('Images.url'), 'previewImage'],
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        group: ['spot.id'],
        where: {
            ownerId: req.user.id
        }
    });

    res.status(200);
    res.json(spots);
});

router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;
    const spot = await Spot.findOne({
        include: [
            { model: Image, attributes: ['id', [sequelize.literal('Images.id'), 'imageableId'], 'url',] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        ],
        where: {
            id: id
        }
    });

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json(spot);
});

router.post('/', requireAuth, async (req, res) => {
    const ownersId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }

    const newSpot = await Spot.create({
        ownerId: ownersId, address, city, state, country, lat, lng, name, description, price
    })

    res.status(201);
    return res.json(newSpot);
});

// Add image to a spot at the specific spodId
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    else if (req.user.id !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
    const reviewsId = await Review.findOne({
        where: { spotId: req.params.spotId }
    })
    const usersId = req.user.id;
    const spotId = parseInt(req.params.spotId);
    const { url } = req.body;

    // const newImage = await Image.build({
    //     url, previewImage: true, spotId: spotId, reviewId: reviewsId.spotId, userId: usersId
    // });
    // await newImage.save();
    const image = await Image.findOne({
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        // where: { id: [sequelize.fn('max', sequelize.col('id'))] }
        where: { id: await Image.max('id') }
    });
    res.status(200)
    return res.json(image);
});

// edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    else if (req.user.id !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }

    spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    res.status(200);
    return res.json(spot);
});

//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    else if (req.user.id !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
    await spot.destroy();
    res.status(200);
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

// Get reviews with a spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const id = req.params.spotId;
    const reviews = await Review.findAll({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Image, as: 'Images' }
        ],
        where: {
            spotId: id
        }
    });
    if (!reviews) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json({ "Reviews": reviews });
});


module.exports = router;
