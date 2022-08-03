const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { Spot, User, Review, Image, Sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

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

    // lazy loading
    // const spots = await Spot.findAll({
    //     attributes: {
    //         include: [
    //             [sequelize.fn("AVG", sequelize.col("Reviews.stars")), 'avgRating']
    //         ]
    //     }
    // })

    res.status(200);
    return res.json({ "Spots": spots });
})

router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
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
        // include: [
        //     { model: Image, attributes: ['id', "url"] },
        //     { model: User, attributes: ['id', 'username'] }],
        where: {
            id: id
        }
    });
    const owner = User.findOne({
        attributes: ['id', 'username'],
        where: {
            id: id
        }
    })
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json(owner);
});

router.get('/:spotId/reviews', async (req, res) => {
    const id = req.params.spotId;
    const reviews = await Review.findAll({
        include: [{ model: User, attributes: ['id', 'username'] }],
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
})


module.exports = router;
