const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { Spot, User, Review, Image, Sequelize, sequelize, Booking } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');


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
    // let payload = [];
    // const spots = await User.findAll();
    // const owner = await spots[0].getSpot();
    // for (let i = 0; i < spots.length; i++) {
    //     let spot = spots[i];
    //     // const image = await spot.getImage({ attributes: [['url', 'previewImage']] });
    //     // const avgStars = await spot.getReview();
    //     const user = await spot.getUser();
    //     const spotData = {
    //         id: spot.id,
    //         name: spot.name,
    //         user: user,
    //         previewImage: image,
    //         avgRating: avgStars
    //     }
    //     payload.push(spotData)
    // }


    res.status(200);
    return res.json(spots);
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
        attributes: { exclude: ['reviewId'] },
        where: { spotId: req.params.spotId }
    });
    let reviewId = null;
    if (reviewsId) {
        reviewId = reviewsId.spotId;
    };

    const usersId = req.user.id;
    const { url } = req.body;

    const newImage = await Image.create({
        url, previewImage: true, spotId: req.params.spotId, reviewId, userId: usersId
    });

    res.status(200)
    return res.json({
        "id": newImage.id,
        "imageableId": req.params.spotId,
        "url": newImage.url
    });
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
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    const reviews = await Review.findAll({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url'] }
        ],
        where: {
            spotId: req.params.spotId
        }
    });
    res.status(200);
    return res.json({ "Reviews": reviews });
});

// Create a review for a spot from the spotId
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };
    // console.log(spot)
    const reviewExists = await Review.findOne({
        attributes: { exclude: ['reviewId'] },
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    });
    console.log(reviewExists)
    if (reviewExists) {
        res.status(403);
        return res.json({
            "message": "User already has a review for this spot",
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
    const newReview = await Review.create({
        review, stars, spotId: req.params.spotId, userId: req.user.id
    });
    res.status(201);
    return res.json(newReview)
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };
    if (spot.ownerId !== req.user.id) {
        const bookings = await Booking.findAll({
            attributes: [['spotId', 'startDate', 'endDate']],
            where: { spotId: req.params.spotId }
        });
        res.status(200);
        return res.json({ "Bookings": bookings });
    };
    if (spot.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
            include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
            where: { spotId: req.params.spotId }
        });
        res.status(200);
        return res.json({ "Bookings": bookings });
    };
});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (req.user.id !== spot.ownerId) {
        if (endDate <= startDate) {
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            });
        };
        const allBookings = await Booking.findAll({
            where: { spotId: req.params.spotId }
        });

        for (let i = 0; i < allBookings.length; i++) {
            let booking = allBookings[i];
            let bookingStartMonth = (booking.startDate.getMonth() + 1);
            let bookingEndMonth = (booking.endDate.getMonth() + 1);
            let bookingStartDate = (booking.startDate.getDate() + 1);
            let bookingEndDate = (booking.endDate.getDate() + 1);

            if (booking.startDate.getFullYear() === startDate.getFullYear() && booking.endDate.getFullYear() === endDate.getFullYear()) {
                if (bookingStartMonth === startDate.getMonth() + 1 || bookingEndMonth === startDate.getMonth() + 1) {
                    for (let i = bookingStartDate; i <= bookingEndDate; i++) {
                        let dateRange = [];
                        dateRange.push(i);
                        if (dateRange.includes(startDate.getDate() + 1) || dateRange.includes(endDate.getDate() + 1)) {
                            res.status(403);
                            return res.json({
                                "message": "Sorry, this spot is already booked for the specified dates",
                                "statusCode": 403,
                                "errors": {
                                    "startDate": "Start date conflicts with an existing booking",
                                    "endDate": "End date conflicts with an existing booking"
                                }
                            });
                        }
                    }
                }
            }
        };
        const newBooking = await Booking.create({
            spotId: req.params.spotId, userId: req.user.id, startDate, endDate
        });
        res.status(200);
        return res.json(newBooking);
    } else {
        res.status(403);
        return res.json({
            "message": "Owner cannot book own spot.",
            "status": 403
        })
    }

});


module.exports = router;
