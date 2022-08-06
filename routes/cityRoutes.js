const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const wrapAsync = require('../utils/wrapAsync');

router.get('/austin', wrapAsync(cityController.getAustin));

router.get('/dallas', wrapAsync(cityController.getDallas));

router.get('/houston', wrapAsync(cityController.getHouston));

router.get('/sanantonio', wrapAsync(cityController.getSanAntonio));

router.get('/other', wrapAsync(cityController.getOther));

module.exports = router;
