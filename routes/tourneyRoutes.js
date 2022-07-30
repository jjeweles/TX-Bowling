const express = require('express');
const tourneyController = require("../controllers/tourneyController.js");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudinary/index.js");
const wrapAsync = require("../utils/wrapAsync");
const upload = multer({storage});

const tourneyAuth = (req, res, next) => {
    next();
}

router.get('/calendar', tourneyController.getCalendar);

router.get('/addtourney', tourneyController.addTourney);

router.post('/addtourneypost', tourneyAuth, upload.array('tournamentFlyer'), wrapAsync(tourneyController.addTourneyToDB));

router.get('/itaaverages', wrapAsync(tourneyController.getItaAverages));

router.post('/itasearch', wrapAsync(tourneyController.getItaSearch));

module.exports = router;