const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    // let payload = [];
    // const bookings = await Booking.findAll({
    //     where: { userId: req.user.id }
    // });
    // if (!bookings[0]) {
    //     res.status(200);
    //     return res.json({ "message": "No bookings have been made." })
    // }
    // for (let i = 0; i < bookings.length; i++) {
    //     let booking = bookings[i];
    //     const spots = await Spot.findAll({
    //         attributes: { exclude: ['createdAt', 'updatedAt'] },
    //         where: { id: booking.spotId },
    //     });
    //     const images = await spots[i].getImage();
    //     // const images = await Image.findAll({
    //     //     where: { spotId: spots[i].id }
    //     // });
    //     let spotData = {
    //         id: spots[i].id,
    //         ownerId: spots[i].ownerId,
    //         address: spots[i].address,
    //         city: spots[i].city,
    //         state: spots[i].state,
    //         country: spots[i].country,
    //         lat: spots[i].lat,
    //         lng: spots[i].lng,
    //         name: spots[i].name,
    //         price: spots[i].price,
    //         previewImage: images[i].url
    //     }

    //     let bookingData = {
    //         id: booking.id,
    //         spotId: booking.spotId,
    //         Spot: spotData,
    //         userId: booking.userId,
    //         startDate: booking.startDate,
    //         endDate: booking.endDate,
    //         createdAt: booking.createdAt,
    //         updatedAt: booking.updatedAt
    //     }
    //     payload.push(bookingData);
    // }
    // res.status(200);
    // return res.json({ "Bookings": payload });
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    let payload = [];

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];
        const spot = await Spot.findOne({ where: { id: booking.spotId } });
        const image = await Image.findOne({ where: { spotId: spot.id } })

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
            price: spot.price,
            previewImage: image.url
        }
        let bookingData = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: spotData,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        payload.push(bookingData);
    }
    res.status(200);
    res.json({ "Bookings": payload });
});


// edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
    else if (booking.userId === req.user.id) {
        let { startDate, endDate } = req.body.payload;
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        let currentDate = new Date();
        let bookingStartMonth = (booking.startDate.getMonth() + 1);
        let bookingEndMonth = (booking.endDate.getMonth() + 1);
        let bookingStartDate = (booking.startDate.getDate() + 1);
        let bookingEndDate = (booking.endDate.getDate() + 1);

        if (startDate > endDate) {
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            })
        }

        if (currentDate > booking.endDate) {
            res.status(403);
            return res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            });
        }
        else if (booking.startDate.getFullYear() === currentDate.getFullYear() && booking.endDate.getFullYear() === currentDate.getFullYear()) {
            if (bookingStartMonth === currentDate.getMonth() + 1 || bookingEndMonth === currentDate.getMonth() + 1) {
                for (let i = bookingStartDate; i <= bookingEndDate; i++) {
                    let dateRange = [];
                    dateRange.push(i);
                    if (dateRange.includes(currentDate.getDate() + 1)) {
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
        booking.update({
            startDate: new Date(req.body.payload.startDate),
            endDate: new Date(req.body.payload.endDate)
        });
        res.status(200);
        return res.json(booking)
    };
    res.status(403);
    return res.json({
        "message": "Forbidden",
        "status": 403
    });
});

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
    else if (booking.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "status": 403
        });
    }
    let currentDate = new Date();

    let bookingStartMonth = (booking.startDate.getMonth() + 1);
    let bookingEndMonth = (booking.endDate.getMonth() + 1);
    let bookingStartDate = (booking.startDate.getDate() + 1);
    let bookingEndDate = (booking.endDate.getDate() + 1);

    if (booking.startDate.getFullYear() === currentDate.getFullYear() && booking.endDate.getFullYear() === currentDate.getFullYear()) {
        if (bookingStartMonth === currentDate.getMonth() + 1 || bookingEndMonth === currentDate.getMonth() + 1) {
            for (let i = bookingStartDate; i <= bookingEndDate; i++) {
                let dateRange = [];
                dateRange.push(i);
                if (dateRange.includes(currentDate.getDate() + 1)) {
                    res.status(403);
                    return res.json({
                        "message": "Bookings that have been started can't be deleted",
                        "statusCode": 403
                    });
                }
            }
        }
    }
    await booking.destroy();
    res.status(200);
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


module.exports = router;
