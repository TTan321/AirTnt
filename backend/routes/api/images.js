const express = require('express');

const { Review, Spot, User, Image, Booking, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    console.log('hi')
    const image = await Image.findByPk(req.params.imageId);
    if (!image) {
        res.status(404);
        res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    }
    if (image.userId === req.user.id) {
        image.destroy();
        res.status(200);
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
    res.status(403);
    res.json({
        "message": "Forbidden",
        "statusCode": 403
    })
});


module.exports = router;
