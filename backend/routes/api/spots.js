const express = require('express');
const { Spot } = require('../../db/models/user')

const router = express.Router();

router.get('/spots', async (req, res) => {
    const spots = await Spot.findAll();

    res.status(200);
    return res.json(spots);
});



module.exports = router;
