const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    let payload = [];
    const bookings = await Booking.findAll({
        where: { userId: req.user.id }
    });
    if (!bookings) {
        res.status(200);
        return res.json({ "message": "No bookings have been made." })
    }
    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];
        const spots = await Spot.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id: booking.spotId },
        });
        const images = await Image.findAll({
            where: { spotId: spots[i].id }
        });
        let spotData = {
            id: spots[i].id,
            ownerId: spots[i].ownerId,
            address: spots[i].address,
            city: spots[i].city,
            state: spots[i].state,
            country: spots[i].country,
            lat: spots[i].lat,
            lng: spots[i].lng,
            name: spots[i].name,
            price: spots[i].price,
            previewImage: images[i].url
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
    return res.json({ "Bookings": payload });
});





module.exports = router;
