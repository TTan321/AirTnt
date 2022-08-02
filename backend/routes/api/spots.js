const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    res.status(200);
    return res.json({ "Spots": spots });
})

// router.get('/current', requireAuth, async (req, res) => {
//     const spots = await Spot.findAll({
//         where: {
//             ownerId:
//         }
//     });
//     res.status(200);
//     res.json(spots);
// })

router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);
    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json(spot);
})


module.exports = router;
