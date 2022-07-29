const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const wrapAsync = require('../utils/wrapAsync');

router.get('/austin', cityController.getAustin);

router.get('/dallas', cityController.getDallas);

router.get('/houston', cityController.getHouston);

router.get('/sanantonio', cityController.getSanAntonio);

router.get('/other', cityController.getOther);

module.exports = router;