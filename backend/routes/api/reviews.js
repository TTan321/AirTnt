const express = require('express');

const { Review, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

})

module.exports = router;
